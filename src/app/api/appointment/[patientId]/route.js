import { connectToDB } from "../../../../../utils/database"
import Appointment from "../../../../models/Appointment"


// get appointment with id
export const POST = async (req, res) => {
    const { patientId } = await req.json()
    try {
        await connectToDB()
        const existingAppointment = await Appointment.find({ patientId });
        if (existingAppointment) {
            return new Response(JSON.stringify(existingAppointment), {
                status: 201,
                code: 0
            })
        }
        return new Response('cannot find appointment', {
            status: 401,
            code: 1
        })
    } catch (e) {
        console.log(e)
        return new Response(`Failed to load data from appointment with id:${id}`, {
            status: 500,
            code: 2
        })
    }
}

