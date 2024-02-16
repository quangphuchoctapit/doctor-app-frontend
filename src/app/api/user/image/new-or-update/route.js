import { connectToDB } from "../../../../../../utils/database"
import User from "../../../../../models/user"

export const POST = async (req, res) => {
    const { userId, image } = await req.json()
    try {
        await connectToDB()
        const updateOrCreateDoctorInfo = await User.findOneAndUpdate(
            { _id: userId },
            // Update operations
            { $set: { image } },
            // Options
            { upsert: true, returnOriginal: false }
        )
        if (updateOrCreateDoctorInfo) {
            return new Response(JSON.stringify('update user img successfully'), {
                status: 201
            })
        }
        return new Response(JSON.stringify('Cannot update user img'), {
            status: 201
        })
    } catch (e) {
        console.log(e)
        return new Response('Failed to create new user img', {
            status: 500
        })
    }
}