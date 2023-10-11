import mongoose from "mongoose";

const OrderItemSchema = mongoose.Schema({
    orderID: {
        type: String,
        required: true,
    },
    itemID: {
        type: String,
        required: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    itemPrice: {
        type: Number,
        required: true,
    },
    itemUnit: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    availableQuantity: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
}, {
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'updatedOn'
    }
});

const OrderItem = mongoose.model('OrderItem', OrderItemSchema);
export default OrderItem;