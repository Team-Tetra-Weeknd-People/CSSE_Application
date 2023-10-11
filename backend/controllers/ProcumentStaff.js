import ProcumentStaff from '../models/ProcumentStaff.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

//authenticating the ProcumentStaff
export const authProcumentStaff = async (req, res) => {
    const { email, password } = req.body;
    try {
        const procumentStaff = await ProcumentStaff.findOne({ email });
        if (procumentStaff) {
            if (bcrypt.compareSync(password, procumentStaff.password)) {
                const secret = process.env.JWT_SECRET;

                const token = jwt.sign({ id: procumentStaff._id, email: procumentStaff.email }, secret, {
                    expiresIn: "3h",
                });

                return res.status(200).json({ success: true, user: procumentStaff.permissionLevel, message: "ProcumentStaff authenticated", token: token });
            }
            return res.status(406).json({ success: false, user: true, message: "Password Incorrect" });
        }
        else {
            return res.status(402).json({ success: false, user: false, message: "ProcumentStaff doesn't exist" });
        }
    } catch (error) {
        return res.status(404).json({ message: error });
    }
}

export const getAllProcumentStaffs = async (req, res) => {
    try {
        const procumentStaffs = await ProcumentStaff.find();
        res.status(200).json(procumentStaffs);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const getProcumentStaff = async (req, res) => {
    const id = req.params.id;
    try {
        const procumentStaff = await ProcumentStaff.findById(id);
        res.status(200).json(procumentStaff);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const createProcumentStaff = async (req, res) => {
    const procumentStaff = req.body;
    const newProcumentStaff = new ProcumentStaff(procumentStaff);
    try {
        await newProcumentStaff.save();
        res.status(201).json(newProcumentStaff);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const updateProcumentStaff = async (req, res) => {
    const id = req.params.id;
    const procumentStaff = req.body;
    try {
        await ProcumentStaff.findByIdAndUpdate(id, procumentStaff);
        res.status(201).json(procumentStaff);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const deleteProcumentStaff = async (req, res) => {
    const id = req.params.id;
    try {
        await ProcumentStaff.findByIdAndDelete(id);
        res.status(201).json({ message: "ProcumentStaff deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export default {
    authProcumentStaff,
    getAllProcumentStaffs,
    getProcumentStaff,
    createProcumentStaff,
    updateProcumentStaff,
    deleteProcumentStaff
}

