import express from "express";
import Order from "../../controllers/Order.js";

const router = express.Router();

router.get("/", Order.getAllOrders);
router.get("/getOne/:id", Order.getOrder);
router.get("/siteManager/:siteManagerID", Order.getOrderBySiteManagerID);
router.get("/supplier/:supplierID", Order.getOrderBySupplierID);
router.post("/", Order.createOrder);
router.put("/:id", Order.updateOrder);
router.delete("/:id", Order.deleteOrder);

export default router;
