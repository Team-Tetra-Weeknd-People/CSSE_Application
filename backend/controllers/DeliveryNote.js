import DeliveryNote from "../models/DeliveryNote.js";

export const getAllDeliveryNotes = async (req, res) => {
  try {
    const deliveryNotes = await DeliveryNote.find();
    res.status(200).json(deliveryNotes);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
//get one deliveryNote
export const getDeliveryNote = async (req, res) => {
  try {
    const deliveryNote = await DeliveryNote.findById(req.params.id);
    res.status(200).json(deliveryNote);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
//create deliveryNote
export const createDeliveryNote = async (req, res) => {
  const deliveryNote = req.body;
  const newDeliveryNote = new DeliveryNote(deliveryNote);
  try {
    await newDeliveryNote.save();
    res.status(201).json(newDeliveryNote);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
//update deliveryNote
export const updateDeliveryNote = async (req, res) => {
  const id = req.params.id;
  const update = req.body;
  try {
    await DeliveryNote.findByIdAndUpdate(id, update);
    res.status(200).send({ status: "Delivery details updated" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

//delete deliveryNote
export const deleteDeliveryNote = async (req, res) => {
  const id = req.params.id;
  try {
    await DeliveryNote.findByIdAndDelete(id);
    res.status(201).json({ message: "DeliveryNote deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

//get delivery notes by order id
export const getDeliveryNotesByOrderId = async (req, res) => {
  const id = req.params.id;
  try {
    const deliveryNotes = await DeliveryNote.find({ orderId: id });
    res.status(200).json(deliveryNotes);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export default {
  getAllDeliveryNotes,
  getDeliveryNote,
  createDeliveryNote,
  updateDeliveryNote,
  deleteDeliveryNote,
  getDeliveryNotesByOrderId,
};
