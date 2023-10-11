import mongoose from "mongoose";
import bcrypt from "bcrypt";

const ManagerSchema = mongoose.Schema({
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
        default: "MANAGER",
        required: true,
    }
}, {
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'updatedOn'
    }
});

ManagerSchema.pre("save", async function (next) {
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

const Manager = mongoose.model('Manager', ManagerSchema);
export default Manager;