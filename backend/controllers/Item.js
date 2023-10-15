import Item from '../models/Item.js';

export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

//get one item
export const getItem = async (req, res) => {
    const id = req.params.id;
    try {
        const item = await Item.findById(id);
        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

//get by catalogueID
export const getItemByCatalogueID = async (req, res) => {
    const catalogueID = req.params.catalogueID;
    try {
        const item = await Item.find({ catalogueID: catalogueID });
        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

//get by supplierID
export const getItemBySupplierID = async (req, res) => {
    const supplierID = req.params.supplierID;
    try {
        const item = await Item.find({ supplierID: supplierID });
        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

//create item
export const createItem = async (req, res) => {
    const item = req.body;
    const newItem = new Item(item);
    try {
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

//update item
export const updateItem = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        await Item.findByIdAndUpdate(id, update);
        res.status(200).send({ status: "Item details updated" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

//delete item
export const deleteItem = async (req, res) => {
    const id = req.params.id;
    try {
        await Item.findByIdAndDelete(id,);
        res.status(200).send({ status: "Item details Deleted" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export default {
    getAllItems,
    getItem,
    getItemByCatalogueID,
    getItemBySupplierID,
    createItem,
    updateItem,
    deleteItem
}