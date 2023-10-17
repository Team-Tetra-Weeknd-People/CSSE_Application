import express from "express";
import Order from "../../controllers/Order.js";

const router = express.Router();

router.get("/", Order.getAllOrders);
router.get("/getOne/:id", Order.getOrder);
router.get("/siteManager/:siteManagerID", Order.getOrderBySiteManagerID);
router.get("/supplier/:supplierID", Order.getOrderBySupplierID);
router.get(
  "/status/:status/supplier/:supplierID",
  Order.getOrdersByStatusAndSupplierID
);
router.post("/", Order.createOrder);
router.put("/:id", Order.updateOrder);
router.delete("/:id", Order.deleteOrder);
router.post("/sendEmail", Order.emailForInvoice);

export default router;
