import OrderItems from "../models/OrderItems.js";

//get OrderItems By OrderID
export const getOrderItemsByOrderID = async (req, res) => {
    const orderID = req.params.orderID;
    try {
        const orderItems = await OrderItems.find({ orderID: orderID });
        res.status(200).json(orderItems);
    }
    catch (error) {
        res.status(404).json({ message: error });
    }
}

//create OrderItems
export const createOrderItems = async (req, res) => {
    const orderItems = req.body;
    const newOrderItems = new OrderItems(orderItems);
    try {
        await newOrderItems.save();
        res.status(201).json(newOrderItems);
    }
    catch (error) {
        res.status(404).json({ message: error });
    }
}

//delete OrderItems
export const deleteOrderItems = async (req, res) => {
    const id = req.params.id;
    try {
        await OrderItems.findByIdAndDelete(id);
        res.status(200).send({ status: "OrderItems deleted" });
    }
    catch (error) {
        res.status(404).json({ message: error });
    }
}

export default {
    getOrderItemsByOrderID,
    createOrderItems,
    deleteOrderItems
}

