import Site from "../models/Site.js";

export const getAllSites = async (req, res) => {
    try {
        const sites = await Site.find();
        res.status(200).json(sites);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

//get one site by id
export const getSite = async (req, res) => {
    const id = req.params.id;
    try {
        const site = await Site.findById(id);
        res.status(200).json(site);
    }
    catch (error) {
        res.status(404).json({ message: error });
    }
}

//get by siteManagerID
export const getSiteBySiteManagerID = async (req, res) => {
    const siteManagerID = req.params.siteManagerID;
    try {
        const site = await Site.find({ siteManagerID: siteManagerID });
        res.status(200).json(site);
    }
    catch (error) {
        res.status(404).json({ message: error });
    }
}

//create site
export const createSite = async (req, res) => {
    const site = req.body;
    const newSite = new Site(site);
    try {
        await newSite.save();
        res.status(201).json(newSite);
    }
    catch (error) {
        res.status(404).json({ message: error });
    }
}

//update site
export const updateSite = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        await Site.findByIdAndUpdate(id, update);
        res.status(200).send({ status: "Site details updated" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

//delete site
export const deleteSite = async (req, res) => {
    const id = req.params.id;
    try {
        await Site.findByIdAndDelete(id,);
        res.status(200).send({ status: "Site details Deleted" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export default {
    getAllSites,
    getSite,
    getSiteBySiteManagerID,
    createSite,
    updateSite,
    deleteSite
}