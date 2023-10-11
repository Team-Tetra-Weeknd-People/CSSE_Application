import express from "express";
import SiteManager from "../../controllers/SiteManager.js";

const router = express.Router()

router.post("/auth", SiteManager.authSiteManager);
router.get("/", SiteManager.getAllSiteManagers);
router.get("/:id", SiteManager.getSiteManager);
router.post("/", SiteManager.createManager);
router.put("/:id", SiteManager.updateSiteManager);
router.delete("/:id", SiteManager.deleteSiteManager);

export default router;
