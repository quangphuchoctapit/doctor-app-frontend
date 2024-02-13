import { connectToDB } from "../../../../utils/database"
import User from "../../../models/User"

// get all user with role 'D' (doctors)
export const GET = async (req, res) => {
    try {
        await connectToDB()
        const existingDoctors = await User.find({ role: 'D' });
        if (existingDoctors) {
            return new Response(JSON.stringify(existingDoctors), {
                status: 201,
                code: 0
            })
        }
        return new Response('cannot find doctors', {
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