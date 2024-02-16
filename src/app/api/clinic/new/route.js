import { connectToDB } from "../../../../../utils/database"
import Clinic from "../../../../models/clinic"

export const POST = async (req, res) => {
    const { name, image, description, location, brandOwner } = await req.json()
    const newClinic = new Clinic({
        name, image, description, location, brandOwner
    })
    try {
        await connectToDB()
        const existingClinic = await Clinic.findOne({ name });
        if (existingClinic) {
            return new Response(`existed Clinic with name : ${name}`, {
                status: 200
            })
        }
        await newClinic.save()
        console.log('success create Clinic ');
        return new Response(JSON.stringify(newClinic), {
            status: 201
        })
    } catch (e) {
        console.log(e)
        return new Response('Failed to create new Clinic', {
            status: 500
        })
    }
}