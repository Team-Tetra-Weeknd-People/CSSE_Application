import express from "express";
import DeliveryNote from "../../controllers/DeliveryNote.js";

const router = express.Router();

router.get("/", DeliveryNote.getAllDeliveryNotes);
router.get("/:id", DeliveryNote.getDeliveryNote);
router.post("/", DeliveryNote.createDeliveryNote);
router.put("/:id", DeliveryNote.updateDeliveryNote);
router.delete("/:id", DeliveryNote.deleteDeliveryNote);

export default router;