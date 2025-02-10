import { Request, Response } from "express";
import { buildHierarchy } from "../services/hierarchyService";

export const getHierarchy = async (req: Request, res: Response) => {
  try {
    const hierarchy = await buildHierarchy();
    res.json(hierarchy);
  } catch (error) {
    console.error("Ошибка построения иерархии:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};