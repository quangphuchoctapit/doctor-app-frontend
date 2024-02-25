import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
    },
    location: {
        type: String,
        // required: [true, 'Location is required!'],
    },
    phone: {
        type: String,
        // sparse: true,
        unique: false,
        // required: [true, 'Phone is required!'],
    },
    role: {
        type: String,
        required: [true, 'Role is required!'],
    },
    image: {
        type: String,
    },
    gender: {
        type: String,
        // required: [true, 'Location is required!'],
    },
    balance: {
        type: Number
    }
});

const User = models.User || model("User", UserSchema);

export default User;