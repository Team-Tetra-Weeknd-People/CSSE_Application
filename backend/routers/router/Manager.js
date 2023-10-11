import express from "express";
import Manager from "../../controllers/Manager.js";

const router = express.Router()

router.post("/auth", Manager.authManager);
router.get("/", Manager.getAllManagers);
router.get("/:id", Manager.getManager);
router.post("/", Manager.createManager);
router.put("/:id", Manager.updateManager);
router.delete("/:id", Manager.deleteManager);

export default router;