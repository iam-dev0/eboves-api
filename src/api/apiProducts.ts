import express from "express";
import { getProducts } from "../controllers/controllerProducts";
const app = express();



app.get("/", getProducts);

export default app;