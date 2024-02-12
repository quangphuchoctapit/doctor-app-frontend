import { connectToDB } from "../../../../../utils/database"
import User from "../../../../models/user"

export const POST = async (req, res) => {
    const { username, email, password, role } = await req.json()
    const newUser = new User({
        username, email, password, role
    })
    try {
        await connectToDB()
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response('existed user', {
                status: 200
            })
        }
        await newUser.save()
        console.log('success create table');
        return new Response(JSON.stringify(newUser), {
            status: 201
        })
    } catch (e) {
        console.log(e)
        return new Response('Failed to create new user', {
            status: 500
        })
    }
}