import { ObjectId } from 'mongodb';
import { Schema, model, models } from 'mongoose';

const LocationSchema = new Schema({
    cityName: {
        type: String,
        unique: [true, 'This cityName already exists!'],
        required: [true, 'cityName is required!'],
    },
    timeZone: {
        type: String,
        required: [true, 'timezone is required!'],
    },
});

const Location = models.Location || model("Location", LocationSchema);

export default Location;