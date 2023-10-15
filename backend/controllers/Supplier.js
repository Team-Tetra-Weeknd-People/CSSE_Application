import Supplier from "../models/Supplier.js";
import Catalogue from "../models/Catalogue.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//authenticating the Supplier
export const authSupplier = async (req, res) => {
  const { email, password } = req.body;
  try {
    const supplier = await Supplier.findOne({ email });
    if (supplier) {
      if (bcrypt.compareSync(password, supplier.password)) {
        const secret = process.env.JWT_SECRET;

        const token = jwt.sign(
          { id: supplier._id, email: supplier.email },
          secret,
          {
            expiresIn: "3h",
          }
        );

        return res
          .status(200)
          .json({
            success: true,
            user: supplier.permissionLevel,
            message: "Supplier authenticated",
            token: token,
          });
      }
      return res
        .status(406)
        .json({ success: false, user: true, message: "Password Incorrect" });
    } else {
      return res
        .status(402)
        .json({
          success: false,
          user: false,
          message: "Supplier doesn't exist",
        });
    }
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

export const getAllSuppliers = async (req, res) => {
  console.log("getAllSuppliers");
  try {
    const suppliers = await Supplier.find();
    for (let i = 0; i < suppliers.length; i++) {
      //get catelougues by supplier
      const catelougues = await Catalogue.find({
        supplierID: suppliers[i]._id,
      });
      // append catelougues to supplier
      suppliers[i].catelougues = catelougues;
    }
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getSupplier = async (req, res) => {
  const id = req.params.id;
  try {
    const supplier = await Supplier.findById(id);
    res.status(200).json(supplier);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createSupplier = async (req, res) => {
  const supplier = req.body;
  const newSupplier = new Supplier(supplier);
  try {
    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const updateSupplier = async (req, res) => {
  const id = req.params.id;
  const supplier = req.body;
  try {
    await Supplier.findByIdAndUpdate(id, supplier);
    res.status(200).json(supplier);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const deleteSupplier = async (req, res) => {
  const id = req.params.id;
  try {
    await Supplier.findByIdAndDelete(id);
    res.status(200).json({ message: "Supplier deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export default {
  authSupplier,
  getAllSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
