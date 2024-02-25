import { log } from "console"
import { connectToDB } from "../../../../../../utils/database"
import User from "../../../../../models/user"


export const POST = async (req, res) => {
    const { userId, ammount } = await req.json();
    console.log('userId', userId);
    try {
        await connectToDB();

            const user = await User.findById(userId);

            if (!user) {
                return new Response(JSON.stringify({ message: 'User not found' }), {
                    status: 404,
                    code: 1
                });
            }

            // Check if totalNumberPatients is a number, if not, initialize it to 0
            if (isNaN(user.balance)) {
                user.balance = 0;
            }

            user.balance += ammount;
            await user.save();

            return new Response(JSON.stringify(user), {
                status: 201,
                code: 0
            });
        }
     catch (e) {
        console.error(e);
        return new Response(`Failed to update appointment with id: ${userId}`, {
            status: 500,
            code: 2
        });
    }
};


