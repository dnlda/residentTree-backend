import express from "express";
import { getCitizen } from "../controllers/citizenContoller";

const router = express.Router();

router.get("/", getCitizen);

export default router;