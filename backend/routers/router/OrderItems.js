import express from "express";
import OrderItem from "../../controllers/OrderItem.js";

const router = express.Router()

router.get("/:id", OrderItem.getOrderItemsByOrderID);
router.post("/", OrderItem.createOrderItem);
router.put("/:id", OrderItem.updateOrderItem);

export default router;