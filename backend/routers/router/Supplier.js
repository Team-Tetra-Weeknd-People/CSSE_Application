import express from "express";
import Supplier from "../../controllers/Supplier.js";

const router = express.Router()

router.get("/", Supplier.getAllSuppliers);
router.get("/:id", Supplier.getSupplier);
router.post("/", Supplier.createSupplier);
router.put("/:id", Supplier.updateSupplier);
router.delete("/:id", Supplier.deleteSupplier);

export default router;