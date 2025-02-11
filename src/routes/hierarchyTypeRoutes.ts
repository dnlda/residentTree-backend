import express from "express";
import { addHierarchy, getHierarchy  } from "../controllers/hierarchyTypeController";

const router =express.Router();

router.get("/", getHierarchy);
router.post("/", addHierarchy);

export default router;