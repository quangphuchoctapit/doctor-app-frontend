import { connectToDB } from "../../../../utils/database"
import Specialty from "../../../models/specialty"


//login
// export const POST = async (req, res) => {
//     const { email, password } = await req.json()
//     const checkUser = new Specialty({
//         email, password
//     })
//     try {
//         await connectToDB()
//         const existingSpecialty = await Specialty.findOne({ email, password }, { password: 0 });
//         if (existingSpecialty) {
//             return new Response(JSON.stringify(existingSpecialty), {
//                 status: 201,
//                 code: 0
//             })
//         }
//         return new Response('cannot find Specialty', {
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


// get all specialty data 
export const GET = async (req, res) => {
    try {
        await connectToDB()
        const existingSpecialty = await Specialty.find({}, { password: 0 });
        if (existingSpecialty) {
            return new Response(JSON.stringify(existingSpecialty), {
                status: 201,
                code: 0
            })
        }
        return new Response('cannot find Specialty', {
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