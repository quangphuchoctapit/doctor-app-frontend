import { connectToDB } from "../../../../../utils/database"
import DoctorInfo from "../../../../models/DoctorInfo"

export const POST = async (req, res) => {
    const { doctorId, locationId, description, price, clinicId, specialtyId, listSchedule } = await req.json()
    try {
        await connectToDB()
        const updateOrCreateDoctorInfo = await DoctorInfo.findOneAndUpdate(
            { doctorId: doctorId },
            // Update operations
            { $set: { locationId: locationId, description: description, price: price, clinicId, specialtyId, listSchedule: listSchedule } },
            // Options
            { upsert: true, returnOriginal: false }
        )
        if (updateOrCreateDoctorInfo) {
            return new Response(JSON.stringify('update doctor Info successfully'), {
                status: 201
            })
        }
        return new Response(JSON.stringify('Cannot update doctor Info'), {
            status: 201
        })
    } catch (e) {
        console.log(e)
        return new Response('Failed to create new DoctorInfo', {
            status: 500
        })
    }
}