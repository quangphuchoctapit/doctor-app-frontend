import { connectToDB } from "../../../../../utils/database"
import Medicine from "../../../../models/medicine"

export const POST = async (req, res) => {
    const { name, image, description,
        price, usage, brandOwner,
        dispensed, originCountry, provider,
        ingredients, type, unit } = await req.json()
    const newMedicine = new Medicine({
        name, image, description,
        price, usage, brandOwner,
        dispensed, originCountry, provider,
        ingredients, type, unit
    })
    try {
        await connectToDB()
        const existingMedicine = await Medicine.findOne({ name });
        if (existingMedicine) {
            return new Response(`existed Medicine with name : ${name}`, {
                status: 200
            })
        }
        await newMedicine.save()
        console.log('success create Medicine ');
        return new Response(JSON.stringify(newMedicine), {
            status: 201
        })
    } catch (e) {
        console.log(e)
        return new Response('Failed to create new Medicine', {
            status: 500
        })
    }
}