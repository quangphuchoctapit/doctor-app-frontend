import { ObjectId } from 'mongodb';
import { Schema, model, models } from 'mongoose';

const DoctorInfoSchema = new Schema({
    doctorId: {
        type: ObjectId,
        unique: [true, 'This DoctorInfo name already exists!'],
        required: [true, 'Email is required!'],
    },
    clinicId: {
        type: ObjectId,
        // unique: [true, 'This DoctorInfo name already exists!'],
        // required: [true, 'Email is required!'],
    },
    locationId: {
        type: ObjectId,
        // unique: [true, 'This DoctorInfo name already exists!'],
        // required: [true, 'Email is required!'],
    },
    specialtyId: {
        type: ObjectId,
        // unique: [true, 'This DoctorInfo name already exists!'],
        // required: [true, 'Email is required!'],
    },
    clinicId: {
        type: ObjectId,
        // unique: [true, 'This DoctorInfo name already exists!'],
        // required: [true, 'Email is required!'],
    },
    description: {
        type: String,
        // unique: [true, 'This DoctorInfo name already exists!'],
        // required: [true, 'Email is required!'],
    },
    role: {
        type: String,
        // unique: [true, 'This DoctorInfo name already exists!'],
        // required: [true, 'Email is required!'],
    },
    totalLikesPatients: {
        type: Number,
        // unique: [true, 'This DoctorInfo name already exists!'],
        // required: [true, 'Email is required!'],
    },
    totalNumberPatients: {
        type: Number,
        // unique: [true, 'This DoctorInfo name already exists!'],
        // required: [true, 'Email is required!'],
    },
});

const DoctorInfo = models.DoctorInfo || model("DoctorInfo", DoctorInfoSchema);

export default DoctorInfo;