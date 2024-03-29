import { connectToDB } from "../../../../../utils/database"
import Appointment from "../../../../models/Appointment"
import User from "../../../../models/User"


// get appointment with id
export const POST = async (req, res) => {
    const { patientId } = await req.json()
    try {
        await connectToDB();

        const existingAppointment = await Appointment.find({ patientId });

        if (existingAppointment.length > 0) {
            const doctorId = existingAppointment[0].doctorId;
            const usersWithDoctorInfo = await User.aggregate([
                { $match: { _id: doctorId } },
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
            if (usersWithDoctorInfo) {
                return new Response(JSON.stringify({ doctorInfo: usersWithDoctorInfo, appointment: existingAppointment }), {
                    status: 201,
                    code: 0
                })
            }
            return new Response('cannot find doctors', {
                status: 401,
                code: 1
            })

        } else {
            return new Response('Cannot find appointment', {
                status: 404,
                code: 1
            });
        }
    } catch (e) {
        console.log(e)
        return new Response(`Failed to load data from appointment with `, {
            status: 500,
            code: 2
        })
    }
}

