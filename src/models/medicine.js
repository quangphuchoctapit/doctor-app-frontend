import { Schema, model, models } from 'mongoose';

const MedicineSchema = new Schema({
    name: {
        type: String,
        unique: [true, 'This Medicine name already exists!'],
        required: [true, 'Email is required!'],
    },
    image: {
        type: String,
        // required: [true, 'Username is required!'],
        // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
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
    usage: {
        type: String,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    dispensed: {
        type: String,
    },
    originCountry: {
        type: String,
    },
    provider: {
        type: String,
    },
    ingredients: {
        type: String,
    },
    type: {
        type: String,
    },
    price: {
        type: Number,
    },
});

const Medicine = models.Medicine || model("Medicine", MedicineSchema);

export default Medicine;