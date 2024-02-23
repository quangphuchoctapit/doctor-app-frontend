import { connectToDB } from "../../../../../utils/database"
import Appointment from "../../../../models/Appointment"

export const POST = async (req, res) => {
    const { listSchedule, age, name, formerIllnesses, gender, patientId, doctorId, note, number, symptoms, status } = await req.json()
    const newAppointment = new Appointment({
        listSchedule, patientAge: age, patientName: name, patientFormerIllnesses: formerIllnesses, patientGender: gender, patientId, note, patientNumber: number, patientSymptoms: symptoms, doctorId, status
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