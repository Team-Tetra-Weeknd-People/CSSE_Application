import mongoose from "mongoose";

const SiteSchema = mongoose.Schema({
    siteName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    siteManagerID: {
        type: String,
        required: true,
    },
    siteManagerfName: {
        type: String,
        required: true,
    },
    siteManagerlName: {
        type: String,
        required: true,
    },
    siteManagerEmail: {
        type: String,
        required: true,
    },
    siteManagerContact: {
        type: String,
        required: true,
    },
    siteManagerProfilePic: {
        type: String,
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'updatedOn'
    }
});

const Site = mongoose.model('Site', SiteSchema);
export default Site;