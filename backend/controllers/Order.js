import Order from "../models/Order.js";

//get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

//get one order by id
export const getOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.findById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

//get by siteManagerID
export const getOrderBySiteManagerID = async (req, res) => {
  const siteManagerID = req.params.siteManagerID;
  try {
    const order = await Order.find({ siteManagerID: siteManagerID });
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

//get by supplierID
export const getOrderBySupplierID = async (req, res) => {
  const supplierID = req.params.supplierID;
  try {
    const order = await Order.find({ supplierId: supplierID });
    // sort order by lastModifiedDateTime
    order.sort((a, b) => {
      return (
        new Date(b.lastModifiedDateTime) - new Date(a.lastModifiedDateTime)
      );
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

//get orders by status and supplierID
export const getOrdersByStatusAndSupplierID = async (req, res) => {
  const status = req.params.status;
  const supplierID = req.params.supplierID;
  try {
    const order = await Order.find({ status: status, supplierId: supplierID });
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

//create order
export const createOrder = async (req, res) => {
  const order = req.body;
  const newOrder = new Order(order);
  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

//update order
export const updateOrder = async (req, res) => {
  const id = req.params.id;
  const update = req.body;
  try {
    await Order.findByIdAndUpdate(id, update);
    res.status(200).send({ status: "Order details updated" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

//delete order
export const deleteOrder = async (req, res) => {
  const id = req.params.id;
  try {
    await Order.findByIdAndDelete(id);
    res.status(200).send({ status: "Order details deleted" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export default {
  getAllOrders,
  getOrder,
  getOrderBySiteManagerID,
  getOrderBySupplierID,
  getOrdersByStatusAndSupplierID,
  createOrder,
  updateOrder,
  deleteOrder,
};
