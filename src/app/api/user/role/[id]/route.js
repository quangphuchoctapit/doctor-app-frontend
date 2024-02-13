import { connectToDB } from "../../../../../../utils/database"
import User from "../../../../../models/user"



// edit user role
export const PUT = async (req, res) => {
    try {
        // Connect to the database
        await connectToDB();

        // Extract user ID and new role from the request body
        const { userId, newRole } = await req.json()
        // console.log(dataa.userId);
        // Find the user by ID and update the role
        const updatedUser = await User.findByIdAndUpdate(userId, { role: newRole }, { new: true });

        // Check if the user was found and updated
        if (updatedUser) {
            // If the user was updated successfully, return the updated user object
            return new Response(JSON.stringify(updatedUser), {
                status: 201,
                code: 0
            })
        } else {
            // If the user was not found, return an error response
            return new Response('cannot modify user because it is not found', {
                status: 401,
                code: 1
            })
        }
    } catch (error) {
        // If an error occurred during the update process, return an error response
        console.error('Error updating user role:', error);
        return new Response('Failed to update user role', {
            status: 500,
            code: 2
        })
    }
}