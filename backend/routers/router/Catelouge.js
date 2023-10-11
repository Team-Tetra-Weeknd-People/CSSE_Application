import express from "express";
import Catelouge from "../../controllers/Catelouge.js";

const router = express.Router()

router.get("/", Catelouge.getAllCatelouges);
router.get("/getOne/:id", Catelouge.getCatelouge);
router.get("/supplier/:supplierID", Catelouge.getCatelougeBySupplierID);
router.post("/", Catelouge.createCatelouge);
router.put("/:id", Catelouge.updateCatelouge);
router.delete("/:id", Catelouge.deleteCatelouge);

export default router;