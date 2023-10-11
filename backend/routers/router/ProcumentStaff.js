import express from "express";
import ProcumentStaff from '../../controllers/ProcumentStaff.js';

const router = express.Router()

router.post("/auth", ProcumentStaff.authProcumentStaff);
router.get("/", ProcumentStaff.getAllProcumentStaffs);
router.get("/:id", ProcumentStaff.getProcumentStaff);
router.post("/", ProcumentStaff.createProcumentStaff);
router.put("/:id", ProcumentStaff.updateProcumentStaff);
router.delete("/:id", ProcumentStaff.deleteProcumentStaff);

export default router;