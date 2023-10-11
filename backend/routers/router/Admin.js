import express from "express";
import Admin from "../../controllers/Admin.js";

const router = express.Router();

router.post("/auth", Admin.authAdmin);
router.get("/", Admin.getAllAdmins);
router.get("/:id", Admin.getAdmin);
router.post("/", Admin.createAdmin);
router.put("/:id", Admin.updateAdmin);
router.delete("/:id", Admin.deleteAdmin);

export default router;