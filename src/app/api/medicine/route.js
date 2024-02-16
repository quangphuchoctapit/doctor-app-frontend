import { connectToDB } from "../../../../utils/database"
import Medicine from "../../../models/medicine"


//login
// export const POST = async (req, res) => {
//     const { email, password } = await req.json()
//     const checkUser = new Medicine({
//         email, password
//     })
//     try {
//         await connectToDB()
//         const existingSpecialty = await Medicine.findOne({ email, password }, { password: 0 });
//         if (existingSpecialty) {
//             return new Response(JSON.stringify(existingSpecialty), {
//                 status: 201,
//                 code: 0
//             })
//         }
//         return new Response('cannot find Medicine', {
//             status: 401,
//             code: 1
//         })
//     } catch (e) {
//         console.log(e)
//         return new Response('Failed to login', {
//             status: 500,
//             code: 2
//         })
//     }
// }


// get all Medicine data 
export const GET = async (req, res) => {
    try {
        await connectToDB()
        const existingMedicine = await Medicine.find({});
        if (existingMedicine) {
            return new Response(JSON.stringify(existingMedicine), {
                status: 201,
                code: 0
            })
        }
        return new Response('cannot find Medicine', {
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