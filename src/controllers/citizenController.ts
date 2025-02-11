import { Request, Response } from "express";
import Citizen from "../models/citizenModel";
import { buildTree } from "../services/treeService";

export const getCitizen = async (req: Request, res: Response) => {
    try {
        const result = await Citizen.find();
        res.json(result);
    } catch (err) {
        console.error("Error fetching citizens:", err);
        res.status(500).json({ message: "Server error" });
    }
};

export const addGroupToCitizen = async (req: Request, res: Response): Promise<void> => {
    try {
        const citizenId = req.params.id;
        const newGroup = req.body;

        if (!newGroup.type || !newGroup.name) {
            res.status(400).json({ message: "Type and name are required for the group" });
            return;
        }

        const updatedCitizen = await Citizen.findByIdAndUpdate(
            citizenId,
            { $push: { groups: newGroup } }, 
            { new: true }
        );

        if (!updatedCitizen) {
            res.status(404).json({ message: "Citizen not found" });
            return;
        }

        res.json(updatedCitizen);
    } catch (err) {
        console.error("Error adding group to citizen:", err);
        res.status(500).json({ message: "Server error" });
    }
};

export const getTree = async (req: Request, res: Response) => {
  try {
    const hierarchy = await buildTree();
    res.json(hierarchy);
  } catch (error) {
    console.error("Tree building error:", error);
    res.status(500).json({ error: "Server error" });
  }
};