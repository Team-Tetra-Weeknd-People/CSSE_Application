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
    siteManagerEmail: {
        type: String,
        required: true,
    },
    siteManagerPhone: {
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
    status: {
        type: String,
        default: 'PENDING',
        enum: ['PENDING', 'PLACED', 'ACCEPT', 'REJECT', 'DELIVERED', 'PAID', 'SEND_APPROVE', 'RECEIVED'],
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
        default: 1
    },
    placedDate: {
        type: Date,
        default: fulldate
    },
    deliveryDate: {
        type: Date,
        default: fulldate
    },
    funding: {
        type: String,
        required: true,
    },
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;