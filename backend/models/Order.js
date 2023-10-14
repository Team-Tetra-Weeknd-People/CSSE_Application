import mongoose from "mongoose";

//get date
let date_ob = new Date();

// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// prints date in YYYY-MM-DD format
let fulldate = year + "-" + month + "-" + date;

console.log(fulldate);

const OrderSchema = mongoose.Schema({
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
    siteManagerContact: {
        type: String,
        required: true,
    },
    siteName: {
        type: String,
        required: true,
    },
    siteAddress: {
        type: String,
        required: true,
    },
    siteContact: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'To Be Priced',
        enum: ['To Be Priced', 'Priced', 'Approval Requested', 'Approved', 'Confirmed', 'Rejected', 'Delivered', 'Closed', 'Received'],
    },
    supplierId: {
        type: String,
        required: true,
    },
    supplierName: {
        type: String,
        required: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    unitPrice: {
        type: Number,
        // required: true,
    },
    itemUnit: {
        type: String,
        // required: true,
    },
    subTotal: {
        type: Number,
        // required: true,
    },
    quantity: {
        type: Number,
        default: 1
    },
    placedDate: {
        type: Date,
        default: fulldate,
        immutable: true
    },
    deliveryDate: {
        type: Date,
        default: null
    },
    funding: {
        type: String,
        required: true,
    },
    lastModifiedDateTime: {
        type: Date,
        default: date_ob
    }
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;