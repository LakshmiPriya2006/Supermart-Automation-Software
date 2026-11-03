import express from "express";
import { addStaff, getStaff, updateStaff, deleteStaff } from "../controllers/staffController.js";

const router = express.Router();

router.post("/", addStaff);
router.get("/", getStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

export default router;

