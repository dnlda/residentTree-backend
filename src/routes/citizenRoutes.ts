import express from "express";
import { getCitizen } from "../controllers/citizenContoller";
import { getHierarchy } from "../controllers/hierarchyController";

const router = express.Router();

router.get("/", getCitizen);
router.get("/hierarchy", getHierarchy);

export default router;