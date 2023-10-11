import express from "express";
import Item from "../../controllers/Item.js";

const router = express.Router()

router.get("/", Item.getAllItems);
router.get("/getOne/:id", Item.getItem);
router.get("/catelouge/:catelougeID", Item.getItemByCatelougeID);
router.get("/supplier/:supplierID", Item.getItemBySupplierID);
router.post("/", Item.createItem);
router.put("/:id", Item.updateItem);
router.delete("/:id", Item.deleteItem);

export default router;