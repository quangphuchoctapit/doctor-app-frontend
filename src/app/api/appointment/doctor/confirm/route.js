import { log } from "console"
import { connectToDB } from "../../../../../../utils/database"
import Appointment from "../../../../../models/Appointment"
import DoctorInfo from "../../../../../models/DoctorInfo"


export const POST = async (req, res) => {
    const { appointmentId, doctorNote, listMedicine, doctorInfoId } = await req.json();
    try {
        await connectToDB();

        const existingAppointments = await Appointment.findOneAndUpdate(
            { _id: appointmentId },
            { $set: { doctorNote, listMedicine, status: 'CONFIRMED' } },
            { new: true }
        );

        if (existingAppointments) {
            const doctorInfo = await DoctorInfo.findById(doctorInfoId);

            if (!doctorInfo) {
                return new Response(JSON.stringify({ message: 'Doctor Info not found' }), {
                    status: 404,
                    code: 1
                });
            }

            // Check if totalNumberPatients is a number, if not, initialize it to 0
            if (isNaN(doctorInfo.totalNumberPatients)) {
                doctorInfo.totalNumberPatients = 0;
            }

            doctorInfo.totalNumberPatients += 1;
            await doctorInfo.save();

            return new Response(JSON.stringify(existingAppointments), {
                status: 201,
                code: 0
            });
        }

        return new Response(JSON.stringify({ message: 'Appointment not found' }), {
            status: 404,
            code: 1
        });
    } catch (e) {
        console.error(e);
        return new Response(`Failed to update appointment with id: ${appointmentId}`, {
            status: 500,
            code: 2
        });
    }
};


