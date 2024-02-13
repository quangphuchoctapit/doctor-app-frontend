import { Schema, model, models } from 'mongoose';

const ClinicSchema = new Schema({
    name: {
        type: String,
        unique: [true, 'This Clinic name already exists!'],
        required: [true, 'Email is required!'],
    },
    image: {
        type: String,
        // required: [true, 'Username is required!'],
        // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    totalDoctors: {
        type: Number,
    },
    available: {
        type: Number,
    },
    brandOwner: {
        type: String,
    },
    location: {
        type: String,
    },

});

const Clinic = models.Clinic || model("Clinic", ClinicSchema);

export default Clinic;