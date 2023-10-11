import express from "express";
import Site from "../../controllers/Site.js";

const router = express.Router()

router.get("/", Site.getAllSites);
router.get("/getOne/:id", Site.getSite);
router.get("/supplier/:supplierID", Site.getSiteBySupplierID);
router.post("/", Site.createSite);
router.put("/:id", Site.updateSite);
router.delete("/:id", Site.deleteSite);

export default router;
