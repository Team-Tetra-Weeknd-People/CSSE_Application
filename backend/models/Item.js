import mongoose from "mongoose";

const ItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    catalogueID: {
        type: String,
        required: true,
    },
    supplierID: {
        type: String,
        required: true,
    },
    supplierShopName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    pricePerUnit: {
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