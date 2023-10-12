import express from "express";
import Catalouge from "../../controllers/Catalouge.js";

const router = express.Router()

router.get("/", Catalouge.getAllCatalouges);
router.get("/getOne/:id", Catalouge.getCatalouge);
router.get("/supplier/:supplierID", Catalouge.getCatalougeBySupplierID);
router.post("/", Catalouge.createCatalouge);
router.put("/:id", Catalouge.updateCatalouge);
router.delete("/:id", Catalouge.deleteCatalouge);

export default router;