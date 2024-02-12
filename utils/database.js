import mongoose from 'mongoose'
let isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)
    if (isConnected) {
        console.log('mongo is already connected')
        return
    }
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'doctor-appointment-app',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true
        console.log('mongo is connected')
    } catch (e) {
        console.log(e)
    }
}