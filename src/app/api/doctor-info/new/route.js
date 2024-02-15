import { connectToDB } from "../../../../../utils/database"
import DoctorInfo from "../../../../models/DoctorInfo"

export const POST = async (req, res) => {
    const { name, image, description,
        price, usage, brandOwner,
        dispensed, originCountry, provider,
        ingredients, type, unit } = await req.json()
    const newMedicine = new DoctorInfo({
        name, image, description,
        price, usage, brandOwner,
        dispensed, originCountry, provider,
        ingredients, type, unit
    })
    try {
        await connectToDB()
        const existingMedicine = await DoctorInfo.findOne({ name });
        if (existingMedicine) {
            return new Response(`existed DoctorInfo with name : ${name}`, {
                status: 200
            })
        }
        await newMedicine.save()
        console.log('success create DoctorInfo ');
        return new Response(JSON.stringify(newMedicine), {
            status: 201
        })
    } catch (e) {
        console.log(e)
        return new Response('Failed to create new DoctorInfo', {
            status: 500
        })
    }
}