import Catelouge from "../models/Catelouge.js";

export const getAllCatelouges = async (req, res) => {
    try {
        const catelouges = await Catelouge.find();
        res.status(200).json(catelouges);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const getCatelouge = async (req, res) => {
    const id = req.params.id;
    try {
        const catelouge = await Catelouge.findById(id);
        res.status(200).json(catelouge);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

//get by supplierID
export const getCatelougeBySupplierID = async (req, res) => {
    const supplierID = req.params.supplierID;
    try {
        const catelouge = await Catelouge.find({ supplierID: supplierID });
        res.status(200).json(catelouge);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

//create catelouge
export const createCatelouge = async (req, res) => {
    const catelouge = req.body;
    const newCatelouge = new Catelouge(catelouge);
    try {
        await newCatelouge.save();
        res.status(201).json(newCatelouge);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

//update catelouge
export const updateCatelouge = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        await Catelouge.findByIdAndUpdate(id, update);
        res.status(200).send({ status: "Catelouge details updated" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

//delete catelouge
export const deleteCatelouge = async (req, res) => {
    const id = req.params.id;
    try {
        await Catelouge.findByIdAndDelete(id,);
        res.status(200).send({ status: "Catelouge details Deleted" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export default {
    getAllCatelouges,
    getCatelouge,
    getCatelougeBySupplierID,
    createCatelouge,
    updateCatelouge,
    deleteCatelouge
}