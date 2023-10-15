import ProcurementStaff from '../models/ProcurementStaff.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

//authenticating the ProcurementStaff
export const authProcurementStaff = async (req, res) => {
    const { email, password } = req.body;
    try {
        const procurementStaff = await ProcurementStaff.findOne({ email });
        if (procurementStaff) {
            if (bcrypt.compareSync(password, procurementStaff.password)) {
                const secret = process.env.JWT_SECRET;

                const token = jwt.sign({ id: procurementStaff._id, email: procurementStaff.email }, secret, {
                    expiresIn: "3h",
                });

                return res.status(200).json({ success: true, user: procurementStaff.permissionLevel, message: "ProcurementStaff authenticated", token: token });
            }
            return res.status(406).json({ success: false, user: true, message: "Password Incorrect" });
        }
        else {
            return res.status(402).json({ success: false, user: false, message: "ProcurementStaff doesn't exist" });
        }
    } catch (error) {
        return res.status(404).json({ message: error });
    }
}

export const getAllProcurementStaffs = async (req, res) => {
    try {
        const procurementStaffs = await ProcurementStaff.find();
        res.status(200).json(procurementStaffs);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const getProcurementStaff = async (req, res) => {
    const id = req.params.id;
    try {
        const procurementStaff = await ProcurementStaff.findById(id);
        res.status(200).json(procurementStaff);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const createProcurementStaff = async (req, res) => {
    const procurementStaff = req.body;
    const newProcurementStaff = new ProcurementStaff(procurementStaff);
    try {
        await newProcurementStaff.save();
        res.status(201).json(newProcurementStaff);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const updateProcurementStaff = async (req, res) => {
    const id = req.params.id;
    const procurementStaff = req.body;
    try {
        await ProcurementStaff.findByIdAndUpdate(id, procurementStaff);
        res.status(201).json(procurementStaff);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const deleteProcurementStaff = async (req, res) => {
    const id = req.params.id;
    try {
        await ProcurementStaff.findByIdAndDelete(id);
        res.status(201).json({ message: "ProcurementStaff deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export default {
    authProcurementStaff,
    getAllProcurementStaffs,
    getProcurementStaff,
    createProcurementStaff,
    updateProcurementStaff,
    deleteProcurementStaff
}

