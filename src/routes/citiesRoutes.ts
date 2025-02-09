import experss from "express";
import { getCities } from "../controllers/citiesController";

const router = experss.Router();

router.get("/", getCities)

export default router