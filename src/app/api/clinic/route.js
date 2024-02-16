import { connectToDB } from "../../../../utils/database"
import Clinic from "../../../models/clinic"

// get all Clinic data 
export const GET = async (req, res) => {
    try {
        await connectToDB()
        const existingClinic = await Clinic.find({}, { password: 0 });
        if (existingClinic) {
            return new Response(JSON.stringify(existingClinic), {
                status: 201,
                code: 0
            })
        }
        return new Response('cannot find Clinic', {
            status: 401,
            code: 1
        })
    } catch (e) {
        console.log(e)
        return new Response('Failed to login', {
            status: 500,
            code: 2
        })
    }
}