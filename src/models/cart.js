import { ObjectId } from 'mongodb';
import { Schema, model, models } from 'mongoose';

const CartSchema = new Schema({
    userId: {
        type:  ObjectId, ref: 'User'
    },
    listMedicine: [{
        quantity: { type: Number },
        medicine: [{
            brandOwner: { type: String },
            available: {type: Number},
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
    discount: {
        type: Number,
    },
    // history: {
    //     type: ,
    // },

});

const Cart = models.Cart || model("Cart", CartSchema);

export default Cart;