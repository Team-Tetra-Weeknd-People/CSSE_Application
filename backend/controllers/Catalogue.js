import Catalogue from "../models/Catalogue.js";

export const getAllCatalogues = async (req, res) => {
    try {
        const catalogues = await Catalogue.find();
        res.status(200).json(catalogues);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const getCatalogue = async (req, res) => {
    const id = req.params.id;
    try {
        const catalogue = await Catalogue.findById(id);
        res.status(200).json(catalogue);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

//get by supplierID
export const getCatalogueBySupplierID = async (req, res) => {
    const supplierID = req.params.supplierID;
    try {
        const catalogue = await Catalogue.find({ supplierID: supplierID });
        res.status(200).json(catalogue);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

//create catalogue
export const createCatalogue = async (req, res) => {
    const catalogue = req.body;
    const newCatalogue = new Catalogue(catalogue);
    try {
        await newCatalogue.save();
        res.status(201).json(newCatalogue);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

//update catalogue
export const updateCatalogue = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        await Catalogue.findByIdAndUpdate(id, update);
        res.status(200).send({ status: "Catalogue details updated" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

//delete catalogue
export const deleteCatalogue = async (req, res) => {
    const id = req.params.id;
    try {
        await Catalogue.findByIdAndDelete(id,);
        res.status(200).send({ status: "Catalogue details Deleted" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export default {
    getAllCatalogues,
    getCatalogue,
    getCatalogueBySupplierID,
    createCatalogue,
    updateCatalogue,
    deleteCatalogue
}