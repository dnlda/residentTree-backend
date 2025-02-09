import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { clientURL, mongoURI } from "./config";
import citizenRoutes  from "./routes/citizenRoutes";
import citiesRouters from "./routes/citiesRoutes";

const app = express();

app.use(cors({
  origin: clientURL,
  methods: "GET, POST, PUT, DELETE",
}));
app.use(express.json());

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/citizen", citizenRoutes);
app.use("/api/cities", citiesRouters);

export default app