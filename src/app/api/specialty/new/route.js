import { connectToDB } from "../../../../../utils/database"
import Specialty from "../../../../models/Specialty"

export const POST = async (req, res) => {
    const { name, image, description } = await req.json()
    const newSpecialty = new Specialty({
        name, image, description
    })
    try {
        await connectToDB()
        const existingSpecialty = await Specialty.findOne({ name });
        if (existingSpecialty) {
            return new Response(`existed Specialty with name : ${name}`, {
                status: 200
            })
        }
        await newSpecialty.save()
        console.log('success create specialty ');
        return new Response(JSON.stringify(newSpecialty), {
            status: 201
        })
    } catch (e) {
        console.log(e)
        return new Response('Failed to create new Specialty', {
            status: 500
        })
    }
}