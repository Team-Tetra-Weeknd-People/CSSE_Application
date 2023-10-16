import express from "express";
import ProcurementStaff from '../../controllers/ProcurementStaff.js';

const router = express.Router()

router.post("/auth", ProcurementStaff.authProcurementStaff);
router.get("/", ProcurementStaff.getAllProcurementStaffs);
router.get("/:id", ProcurementStaff.getProcurementStaff);
router.post("/", ProcurementStaff.createProcurementStaff);
router.put("/:id", ProcurementStaff.updateProcurementStaff);
router.delete("/:id", ProcurementStaff.deleteProcurementStaff);

export default router;