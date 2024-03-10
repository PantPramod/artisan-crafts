import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref:"Product",
        required: [true, "Product Id is required"]
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: [true, "User Id is required"]
    },
    quantity: {
        type: Number,
        default: 1,
        min: [1, "Quantity must be greater than or equal to one"],
        max: [50, 'Quantity cannot exceed fifty'],
    },
    price:Number
},
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
)

const Cart = mongoose.model('Cart', cartSchema);

export default Cart