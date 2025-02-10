import express, { Request, Response } from "express";
import { addGroupToCitizen, getCitizen } from "../controllers/citizenController";
import { getHierarchy } from "../controllers/hierarchyController";

const router = express.Router();

router.get("/", getCitizen);
router.get("/hierarchy", getHierarchy);
router.patch("/:id/groups", addGroupToCitizen);


export default router;