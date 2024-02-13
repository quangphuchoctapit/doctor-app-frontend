import { Schema, model, models } from 'mongoose';

const SpecialtySchema = new Schema({
    name: {
        type: String,
        unique: [true, 'This specialty name already exists!'],
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
});

const Specialty = models.Specialty || model("Specialty", SpecialtySchema);

export default Specialty;