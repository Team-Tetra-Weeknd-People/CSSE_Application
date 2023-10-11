import express from "express";
import OrderItem from "../../controllers/OrderItem.js";

const router = express.Router()

router.get("/:id", OrderItem.getOrderItemsByOrderID);
router.post("/", OrderItem.createOrderItem);
router.delete("/:id", OrderItem.deleteOrderItem);

export default router;