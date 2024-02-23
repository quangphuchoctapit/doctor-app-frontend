import { log } from "console"
import { connectToDB } from "../../../../../../utils/database"
import Appointment from "../../../../../models/Appointment"
import User from "../../../../../models/User"


// get appointment with id
export const POST = async (req, res) => {
    const { doctorId } = await req.json()
    try {
        await connectToDB();

        const existingAppointments = await Appointment.find({ doctorId: doctorId });

        if (existingAppointments.length > 0) {
            const doctorId = existingAppointments[0].doctorId;
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

            const appointmentsData = [];
            for (const appointment of existingAppointments) {
                const patientId = appointment.patientId;
                const patientInfo = await User.findOne({ _id: patientId });
                appointmentsData.push({
                    patientInfo: patientInfo,
                    doctorInfo: usersWithDoctorInfo,
                    appointment: appointment
                });
            }

            return new Response(JSON.stringify(appointmentsData), {
                status: 201,
                code: 0
            });
        } else {
            return new Response(JSON.stringify([]), {
                status: 200,
                code: 0
            });
        }
    } catch (e) {
        console.log(e);
        return new Response(`Failed to load data from appointments with doctorId: ${doctorId}`, {
            status: 500,
            code: 2
        });
    }
}


