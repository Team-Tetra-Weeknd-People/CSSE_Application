import mongoose from "mongoose";
import bcrypt from "bcrypt";

const ProcumentStaffSchema = mongoose.Schema({
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
    password: {
        type: String,
        required: true,
    },
    permissionLevel: {
        type: String,
        default: "PROCUMENT_STAFF",
    }
}, {
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'updatedOn'
    }
});

ProcumentStaffSchema.pre("save", async function (next) {
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

const ProcumentStaff = mongoose.model('ProcumentStaff', ProcumentStaffSchema);
export default ProcumentStaff;