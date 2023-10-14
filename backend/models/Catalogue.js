import mongoose from "mongoose";

const CatalogueSchema = mongoose.Schema({
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

const Catalogue = mongoose.model('Catalogue', CatalogueSchema);
export default Catalogue;