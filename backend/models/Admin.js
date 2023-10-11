import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    contactNo: {
        type: String,
        required: true,
        unique: true,
    },
    profilePic: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    permissionLevel: {
        type: String,
        default: "ADMIN",
        required: true,
    }
}, {
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'updatedOn'
    }
});

AdminSchema.pre("save", async function (next) {
    const user = this;
    const password = user.password;

    if (!user.isModified("password")) {
        return next();
    }

    // Number of rounds hash function will execute
    const salt = await bcrypt.genSalt(10);

    const hash = bcrypt.hashSync(password, salt);
    user.password = hash;
    return next();
});

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;