import { connectToDB } from "../../../../utils/database"
import Location from "../../../models/location"


// get all Location data 
export const GET = async (req, res) => {
    try {
        await connectToDB()
        const existingLocation = await Location.find({});
        if (existingLocation) {
            return new Response(JSON.stringify(existingLocation), {
                status: 201,
                code: 0
            })
        }
        return new Response('cannot find Location', {
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