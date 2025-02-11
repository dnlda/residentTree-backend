import { Request, Response } from "express";
import Hierarchy from "../models/hierarchyTypeModel";

export const getHierarchy = async (req: Request, res: Response) => {
    try {
        const result = await Hierarchy.find();
        res.json(result)
    } catch (err) {
        console.error("Error fetching hierarchy type:", err);
        res.status(500).json({ message: "Server error" });
    }
}

export const addHierarchy = async (req: Request, res: Response) => {
    const {order, type} = req.body;

    try {
        const existinItems = await Hierarchy.find({order: {$gte: order}});

        if (existinItems.length > 0) {
            await Hierarchy.updateMany(
                {order: {$gte: order}},
                {$inc: {order: 1}}
            );
        }

        const newHierarchy = new Hierarchy({order, type})
        await newHierarchy.save();
        res.status(201).json(newHierarchy)
    } catch (err) {
        console.error("Error adding hierarchy type:", err);
        res.status(500).json({ message: "Server error" });
    }
}