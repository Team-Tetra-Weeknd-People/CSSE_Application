import express from "express";
import Sample from "../../controllers/sample.js";

const router = express.Router();

router.get("/", Sample.getSamples);
router.post("/", Sample.createSample);
router.put("/:id", Sample.updateSample);
router.delete("/:id", Sample.deleteSample);
router.get("/:id", Sample.getOneSample);

export default router;