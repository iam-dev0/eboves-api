import express from "express";
import { getSuppliers } from "../controllers/controllerSuppliers";
const app = express();



app.get("/", getSuppliers);

export default app;