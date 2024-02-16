import { connectToDB } from "../../../../utils/database"
import User from "../../../models/user"
import DoctorInfo from "../../../models/doctorInfo"

// get all user with role 'D' (doctors)
export const GET = async (req, res) => {
    try {
        await connectToDB()
        // const existingDoctors = await User.find({ role: 'D' }).populate('doctorId');
        // const usersWithDoctorInfo = await User.find({ role: 'D' }).populate({
        //     path: 'doctorId',
        //     model: 'DoctorInfo'
        // });
        const usersWithDoctorInfo = await User.aggregate([
            { $match: { role: 'D' } },
            {
                $lookup: {
                    from: 'doctorinfos', // Name of the DoctorInfo collection
                    localField: '_id',
                    foreignField: 'doctorId',
                    as: 'doctorInfo'
                }
            },
            {
                $unwind: '$doctorInfo' // Unwind the doctorInfo array
            },
            {
                $lookup: {
                    from: 'clinics', // Name of the clinics collection
                    localField: 'doctorInfo.clinicId',
                    foreignField: '_id',
                    as: 'doctorInfo.clinic'
                }
            },
            {
                $lookup: {
                    from: 'locations', // Name of the locations collection
                    localField: 'doctorInfo.locationId',
                    foreignField: '_id',
                    as: 'doctorInfo.location'
                }
            },
            {
                $lookup: {
                    from: 'specialties', // Name of the specialties collection
                    localField: 'doctorInfo.specialtyId',
                    foreignField: '_id',
                    as: 'doctorInfo.specialty'
                }
            },
            {
                $addFields: {
                    'doctorInfo.clinic': { $arrayElemAt: ['$doctorInfo.clinic', 0] },
                    'doctorInfo.location': { $arrayElemAt: ['$doctorInfo.location', 0] },
                    'doctorInfo.specialty': { $arrayElemAt: ['$doctorInfo.specialty', 0] }
                }
            },
            {
                $group: {
                    _id: '$_id',
                    user: { $first: '$$ROOT' }, // Preserve the user data
                    doctorInfo: { $first: '$doctorInfo' } // Group back to single document
                }
            },
            {
                $replaceRoot: {
                    newRoot: { $mergeObjects: ['$user', { doctorInfo: '$doctorInfo' }] } // Combine user and doctorInfo fields
                }
            },
            {
                $project: {
                    password: 0 // Exclude the password field
                }
            }
        ]);
        if (usersWithDoctorInfo.length === 0) {
            const existingDoctor = await User.find({ role: 'D' }, { password: 0 });
            if (existingDoctor) {
                return new Response(JSON.stringify(existingDoctor), {
                    status: 201,
                    code: 0
                })
            }
            return new Response('cannot find User with role "Doctor"', {
                status: 401,
                code: 1
            })
        }
        if (usersWithDoctorInfo) {

            return new Response(JSON.stringify(usersWithDoctorInfo), {
                status: 201,
                code: 0
            })
        }
        return new Response('cannot find doctors', {
            status: 401,
            code: 1
        })
    } catch (e) {
        console.log(e)
        return new Response('Failed to login', {
            status: 500,
            code: 2
        })
    }
}