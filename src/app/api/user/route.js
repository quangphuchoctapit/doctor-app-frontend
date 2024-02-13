import { connectToDB } from "../../../../utils/database"
import User from "../../../models/user"


//login
export const POST = async (req, res) => {
    const { email, password } = await req.json()
    const checkUser = new User({
        email, password
    })
    try {
        await connectToDB()
        const existingUser = await User.findOne({ email, password }, { password: 0 });
        if (existingUser) {
            return new Response(JSON.stringify(existingUser), {
                status: 201,
                code: 0
            })
        }
        return new Response('cannot find user', {
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


// get all users data except passwords
export const GET = async (req, res) => {
    try {
        await connectToDB()
        const existingUser = await User.find({}, { password: 0 });
        if (existingUser) {
            return new Response(JSON.stringify(existingUser), {
                status: 201,
                code: 0
            })
        }
        return new Response('cannot find user', {
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

