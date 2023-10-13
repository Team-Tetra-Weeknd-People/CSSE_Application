import mongoose from "mongoose";

const CatalougeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
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

const Catalouge = mongoose.model('Catalouge', CatalougeSchema);
export default Catalouge;