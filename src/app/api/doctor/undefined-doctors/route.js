import { connectToDB } from "../../../../../utils/database"
import User from "../../../../models/user"
import DoctorInfo from "../../../../models/DoctorInfo"
export const GET = async (req, res) => {
    try {
        await connectToDB()
        const usersWithEmptyDoctorInfo = await User.aggregate([
            { $match: { role: 'D' } },
            {
                $lookup: {
                    from: 'doctorinfos', // Name of the doctorinfos collection
                    localField: '_id',
                    foreignField: 'doctorId',
                    as: 'doctorInfo'
                }
            },
            {
                $addFields: {
                    hasDoctorInfo: { $gt: [{ $size: '$doctorInfo' }, 0] }
                }
            },
            { $match: { hasDoctorInfo: false } }, // Filter out users with non-empty doctorInfo
            {
                $lookup: {
                    from: 'clinics', // Name of the clinics collection
                    localField: 'clinicId',
                    foreignField: '_id',
                    as: 'clinic'
                }
            },
            {
                $lookup: {
                    from: 'locations', // Name of the locations collection
                    localField: 'locationId',
                    foreignField: '_id',
                    as: 'location'
                }
            },
            {
                $lookup: {
                    from: 'specialties', // Name of the specialties collection
                    localField: 'specialtyId',
                    foreignField: '_id',
                    as: 'specialty'
                }
            },
            {
                $addFields: {
                    'clinic': { $arrayElemAt: ['$clinic', 0] },
                    'location': { $arrayElemAt: ['$location', 0] },
                    'specialty': { $arrayElemAt: ['$specialty', 0] }
                }
            },
            {
                $project: {
                    password: 0 // Exclude the password field
                }
            }
        ]);
        if (usersWithEmptyDoctorInfo.length > 0) {
            return new Response(JSON.stringify(usersWithEmptyDoctorInfo), {
                status: 201,
                code: 0
            })
        }
        return new Response(JSON.stringify('cannot find doctors with empty doctorInfo collection'), {
            status: 201,
            code: 1
        })
    } catch (e) {
        console.log(e)
        return new Response('Failed to load doctors', {
            status: 500,
            code: 2
        })
    }
}
