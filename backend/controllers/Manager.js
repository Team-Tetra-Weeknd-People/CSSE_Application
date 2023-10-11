import Manager from '../models/Manager.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

//authenticating the manager
export const authManager = async (req, res) => {
    const { email, password } = req.body;
    try {
        const manager = await Manager.findOne({ email });
        if (manager) {
            if (bcrypt.compareSync(password, manager.password)) {
                const secret = process.env.JWT_SECRET;

                const token = jwt.sign({ id: manager._id, email: manager.email }, secret, {
                    expiresIn: "3h",
                });

                return res.status(200).json({ success: true, user: manager.permissionLevel, message: "Manager authenticated", token: token });
            }
            return res.status(406).json({ success: false, user: true, message: "Password Incorrect" });
        }
        else {
            return res.status(402).json({ success: false, user: false, message: "Manager doesn't exist" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: error });
    }
}

export const getAllManagers = async (req, res) => {
    try {
        const managers = await Manager.find();
        res.status(200).json(managers);
    }
    catch (error) {
        res.status(404).json({ message: error });
    }
}

export const getManager = async (req, res) => {
    const id = req.params.id;
    try {
        const manager = await Manager.findById(id);
        res.status(200).json(manager);
    }
    catch (error) {
        res.status(404).json({ message: error });
    }
}

export const createManager = async (req, res) => {
    const manager = req.body;
    const newManager = new Manager(manager);
    try {
        await newManager.save();
        res.status(201).json(newManager);
    }
    catch (error) {
        res.status(404).json({ message: error });
    }
}

export const updateManager = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        await Manager.findByIdAndUpdate(id, update);
        res.status(200).send({ status: "Manager details updated" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const deleteManager = async (req, res) => {
    const id = req.params.id;
    try {
        await Manager.findByIdAndDelete(id);
        res.status(200).send({ status: "Manager deleted" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export default {
    authManager,
    getAllManagers,
    getManager,
    createManager,
    updateManager,
    deleteManager
}