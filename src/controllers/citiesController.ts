import { Request, Response } from "express";
import Cities from "../models/citiesModel";

export const getCities = async (req: Request, res: Response) => {
    try {
        const cities = await Cities.find();
        res.json(cities)
    } catch (err) {
        res.status(500).json({message: "Server error"})
    }
}