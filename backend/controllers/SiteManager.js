import SiteManager from '../models/SiteManager.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

//authenticating the SiteManager
export const authSiteManager = async (req, res) => {
    const { email, password } = req.body;
    try {
        const siteManager = await SiteManager.findOne({ email });
        if (siteManager) {
            if (bcrypt.compareSync(password, siteManager.password)) {
                const secret = process.env.JWT_SECRET;

                const token = jwt.sign({ id: siteManager._id, email: siteManager.email }, secret, {
                    expiresIn: "3h",
                });

                return res.status(200).json({ success: true, user: siteManager.permissionLevel, message: "SiteManager authenticated", token: token });
            }
            return res.status(406).json({ success: false, user: true, message: "Password Incorrect" });
        }
        else {
            return res.status(402).json({ success: false, user: false, message: "SiteManager doesn't exist" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: error });
    }
}

export const getAllSiteManagers = async (req, res) => {
    try {
        const siteManagers = await SiteManager.find();
        res.status(200).json(siteManagers);
    }
    catch (error) {
        res.status(404).json({ message: error });
    }
}

export const getSiteManager = async (req, res) => {
    const id = req.params.id;
    try {
        const siteManager = await SiteManager.findById(id);
        res.status(200).json(siteManager);
    }
    catch (error) {
        res.status(404).json({ message: error });
    }
}

export const createManager = async (req, res) => {
    const siteManager = req.body;
    const newSiteManager = new SiteManager(siteManager);
    try {
        await newSiteManager.save();
        res.status(201).json(newSiteManager);
    }
    catch (error) {
        res.status(404).json({ message: error });
    }
}

export const updateSiteManager = async (req, res) => {
    const id = req.params.id;
    const siteManager = req.body;
    try {
        await SiteManager.findByIdAndUpdate(id, siteManager);
        res.status(200).json(siteManager);
    }
    catch (error) {
        res.status(404).json({ message: error });
    }
}

export const deleteSiteManager = async (req, res) => {
    const id = req.params.id;
    try {
        await SiteManager.findByIdAndDelete(id);
        res.status(200).json({ message: "Site Manager deleted successfully" });
    }
    catch (error) {
        res.status(404).json({ message: error });
    }
}

export default {
    authSiteManager,
    getAllSiteManagers,
    getSiteManager,
    createManager,
    updateSiteManager,
    deleteSiteManager
}