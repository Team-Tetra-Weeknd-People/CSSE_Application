import express from "express";
import Catalouge from "../../controllers/Catalogue.js";

const router = express.Router()

router.get("/", Catalouge.getAllCatalogues);
router.get("/getOne/:id", Catalouge.getCatalogue);
router.get("/supplier/:supplierID", Catalouge.getCatalogueBySupplierID);
router.post("/", Catalouge.createCatalogue);
router.put("/:id", Catalouge.updateCatalogue);
router.delete("/:id", Catalouge.deleteCatalogue);

export default router;