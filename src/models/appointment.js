import { ObjectId } from 'mongodb';
import { Schema, model, models } from 'mongoose';

const AppointmentSchema = new Schema({
    patientId: {
        type: ObjectId,
        ref: 'User'
    },
    doctorId: {
        type: ObjectId,
        ref: 'DoctorInfo'
    },
    listSchedule: [{
        date: { type: String },
        scheduleTimes: [{
            id: { type: Number },
            label: { type: String }
        }]
    }],
    status: {
        type: String
    },
    paymentMethod: {
        type: String
    },
    note: {
        type: String
    },
    patientSymptoms: {
        type: String
    },
    patientAge: {
        type: String
    },
    patientFormerIllnesses: {
        type: String
    },
    patientGender: {
        type: String
    },
    patientNumber: {
        type: String
    },
    patientName: {
        type: String
    },
    doctorNote: {
        type: String
    },
    listMedicine: [{
        quantity: { type: Number },
        medicine: [{
            brandOwner: { type: String },
            description: { type: String },
            usage: { type: String },
            originCountry: { type: String },
            image: { type: String },
            ingredients: { type: String },
            price: { type: Number },
            provider: { type: String },
            dispensed: { type: String },
            name: { type: String },
            type: { type: ObjectId, ref: 'Specialty' },
        }]
    }],
});

const Appointment = models.Appointment || model("Appointment", AppointmentSchema);

export default Appointment;