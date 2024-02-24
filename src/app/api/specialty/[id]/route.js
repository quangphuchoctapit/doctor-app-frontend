import { connectToDB } from "../../../../../utils/database"
import Specialty from "../../../../models/specialty"


// get specialty with id
export const POST = async (req, res) => {
    const { id } = await req.json()
    console.log('check id: ', id);
    try {
        await connectToDB()
        const existingSpecialty = await Specialty.find({ _id: id });
        if (existingSpecialty) {
            return new Response(JSON.stringify(existingSpecialty), {
                status: 201,
                code: 0
            })
        }
        return new Response('cannot find specialty', {
            status: 401,
            code: 1
        })
    } catch (e) {
        console.log(e)
        return new Response(`Failed to load data from specialty with id:${id}`, {
            status: 500,
            code: 2
        })
    }
}

