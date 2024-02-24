import { log } from "console"
import { connectToDB } from "../../../../../../utils/database"
import Appointment from "../../../../../models/Appointment"
import User from "../../../../../models/User"


// get appointment with id
export const POST = async (req, res) => {
    const { appointmentId, doctorNote, listMedicine } = await req.json()
    try {
        await connectToDB();

        const existingAppointments = await Appointment.findOneAndUpdate(
            { _id: appointmentId },
            { $set: { doctorNote, listMedicine, status: 'CONFIRMED' } },
            { new: true }
        )
        if (existingAppointments) {
            return new Response(JSON.stringify(existingAppointments), {
                status: 201,
                code: 0
            })
        }
        return new Response(JSON.stringify(existingAppointments), {
            status: 404,
            code: 0
        })
    } catch (e) {
        console.log(e);
        return new Response(`Failed to load data from appointments with doctorId: ${doctorId}`, {
            status: 500,
            code: 2
        });
    }
}


