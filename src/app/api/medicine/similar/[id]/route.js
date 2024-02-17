import { connectToDB } from "../../../../../../utils/database"
import Medicine from "../../../../../models/medicine"


// get medicine with id
export const POST = async (req, res) => {
    const { id } = await req.json()
    console.log('check id: ', id);
    try {
        await connectToDB()
        const existingMedicine = await Medicine.find({ _id: { $not: { $eq: id } } });
        // console.log('medinciencien: ', existingMedicine);
        if (existingMedicine) {
            return new Response(JSON.stringify(existingMedicine), {
                status: 201,
                code: 0
            })
        }
        return new Response('cannot find medicine', {
            status: 401,
            code: 1
        })
    } catch (e) {
        console.log(e)
        return new Response(`Failed to load data from medicine with id:${id}`, {
            status: 500,
            code: 2
        })
    }
}

