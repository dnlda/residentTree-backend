import { Request, Response } from "express";
import Citizen from "../models/citizenModel";

export const getCitizen = async (req: Request, res: Response) => {
    try {
        // const result = await buildCitizenTree();
        const result = await Citizen.find()
        res.json(result);
    } catch (err) {
        console.error("Error fetching citizens:", err);
        res.status(500).json({ message: "Server error" });
    }
};
