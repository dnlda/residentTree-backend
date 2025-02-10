import { Request, Response } from "express";
import Citizen from "../models/citizenModel";

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
        const citizenId = req.params.id; // Получаем _id из параметров запроса
        const newGroup = req.body; // Новый объект группы из тела запроса

        // Проверяем, что newGroup содержит необходимые поля
        if (!newGroup.type || !newGroup.name) {
            res.status(400).json({ message: "Type and name are required for the group" });
            return;
        }

        // Находим гражданина по _id и добавляем новую группу в массив groups
        const updatedCitizen = await Citizen.findByIdAndUpdate(
            citizenId,
            { $push: { groups: newGroup } }, // Используем $push для добавления в массив
            { new: true } // Возвращаем обновленный документ
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