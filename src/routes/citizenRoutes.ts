import express from "express";
import { addGroupToCitizen, getCitizen, getTree } from "../controllers/citizenController";

const router = express.Router();

router.get("/", getCitizen);
router.get("/tree", getTree);
router.patch("/:id/groups", addGroupToCitizen);


export default router;