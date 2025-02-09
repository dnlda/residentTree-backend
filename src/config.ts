import dotenv from "dotenv";
dotenv.config();

export const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/residentTreeDB";
export const PORT = process.env.PORT || 5000;
export const clientURL = process.env.CLIENT_URL!;