import { connectToDB } from "../../../../../utils/database"
import Appointment from "../../../../models/appointment"

export const POST = async (req, res) => {
    const { listSchedule, age, name, formerIllnesses, gender, patientId, doctorId, note, number, symptoms } = await req.json()
    const newAppointment = new Appointment({
        listSchedule, age, name, formerIllnesses, gender, patientId, note, number, symptoms, doctorId
    })
    try {
        await connectToDB()
        const existingAppointment = await Appointment.findOne({ name, listSchedule });
        if (existingAppointment) {
            return new Response(`existed Appointment with patient name : ${name} on ${listSchedule}`, {
                status: 200
            })
        }
        await newAppointment.save()
        console.log('success create Appointment ');
        return new Response(JSON.stringify(newAppointment), {
            status: 201
        })
    } catch (e) {
        console.log(e)
        return new Response('Failed to create new Appointment', {
            status: 500
        })
    }
}