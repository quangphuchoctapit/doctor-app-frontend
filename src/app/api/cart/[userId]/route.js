import { connectToDB } from "../../../../../utils/database"
import Cart from "../../../../models/cart"


// get cart with userid
export const POST = async (req, res) => {
    const { userId } = await req.json()
    console.log('check userId: ', userId);
    try {
        await connectToDB()
        const existingCart = await Cart.find({ userId: userId });
        if (existingCart) {
            return new Response(JSON.stringify(existingCart), {
                status: 201,
                code: 0
            })
        }
        return new Response('cannot find cart', {
            status: 401,
            code: 1
        })
    } catch (e) {
        console.log(e)
        return new Response(`Failed to load data from cart with id:${userId}`, {
            status: 500,
            code: 2
        })
    }
}

