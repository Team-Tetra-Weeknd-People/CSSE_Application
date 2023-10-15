import express from "express";
import Catalogue from "../../controllers/Catalogue.js";

const router = express.Router()

router.get("/", Catalogue.getAllCatalogues);
router.get("/getOne/:id", Catalogue.getCatalogue);
router.get("/supplier/:supplierID", Catalogue.getCatalogueBySupplierID);
router.post("/", Catalogue.createCatalogue);
router.put("/:id", Catalogue.updateCatalogue);
router.delete("/:id", Catalogue.deleteCatalogue);

export default router;