import express from "express";
import { getBrands } from "../controllers/controllerBrands";
const app = express();



app.get("/", getBrands);

export default app;