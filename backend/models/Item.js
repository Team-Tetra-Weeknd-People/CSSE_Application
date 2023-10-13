import mongoose from "mongoose";

const ItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    catelougeID: {
        type: String,
        required: true,
    },
    supplierID: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'updatedOn'
    }
});

const Item = mongoose.model('Item', ItemSchema);
export default Item;