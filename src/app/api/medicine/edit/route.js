import { connectToDB } from "../../../../../utils/database"
import Medicine from "../../../../models/Medicine"


// get medicine with id
export const POST = async (req, res) => {
    const { description, image, type, name, location, unit, price, ingredients,
        dispensed, originCountry, provider, totalDoctors, brandOwner, usage,
        available, medicineId } = await req.json()
    try {
        await connectToDB();

        const existingMedicine = await Medicine.findOneAndUpdate(
            { _id: medicineId },
            {
                $set: {
                    description, image, type, name, location, unit, price, ingredients,
                    dispensed, originCountry, provider, totalDoctors, brandOwner, usage,
                    available
                }
            },
            { new: true }
        )
        if (existingMedicine) {
            return new Response(JSON.stringify(existingMedicine), {
                status: 201,
                code: 0
            })
        }
        return new Response(JSON.stringify(existingMedicine), {
            status: 404,
            code: 0
        })
    } catch (e) {
        console.log(e);
        return new Response(`Failed to load data from medicine with id: ${medicineId}`, {
            status: 500,
            code: 2
        });
    }
}


