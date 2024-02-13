import { connectToDB } from "../../../../utils/database"
import Clinic from "../../../models/Clinic"


//login
// export const POST = async (req, res) => {
//     const { email, password } = await req.json()
//     const checkUser = new Clinic({
//         email, password
//     })
//     try {
//         await connectToDB()
//         const existingSpecialty = await Clinic.findOne({ email, password }, { password: 0 });
//         if (existingSpecialty) {
//             return new Response(JSON.stringify(existingSpecialty), {
//                 status: 201,
//                 code: 0
//             })
//         }
//         return new Response('cannot find Clinic', {
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


// get all Clinic data 
export const GET = async (req, res) => {
    try {
        await connectToDB()
        const existingClinic = await Clinic.find({}, { password: 0 });
        if (existingClinic) {
            return new Response(JSON.stringify(existingClinic), {
                status: 201,
                code: 0
            })
        }
        return new Response('cannot find Clinic', {
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