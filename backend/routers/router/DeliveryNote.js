import express from "express";
import DeliveryNote from "../../controllers/DeliveryNote.js";

const router = express.Router();

router.get("/", DeliveryNote.getAllDeliveryNotes);
router.get("getOne/:id", DeliveryNote.getDeliveryNote);
router.post("/", DeliveryNote.createDeliveryNote);
router.put("/:id", DeliveryNote.updateDeliveryNote);
router.delete("/:id", DeliveryNote.deleteDeliveryNote);
router.get("/order/:id", DeliveryNote.getDeliveryNotesByOrderId);

export default router;
