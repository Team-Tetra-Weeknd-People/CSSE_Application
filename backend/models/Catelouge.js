import mongoose from "mongoose";

const CatelougeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    supplierID: {
        type: String,
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'updatedOn'
    }
});

const Catelouge = mongoose.model('Catelouge', CatelougeSchema);
export default Catelouge;