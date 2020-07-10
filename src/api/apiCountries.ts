import express from "express";
import { getAll } from "../controllers/controllerCountries";
const app = express();

app.get("/", getAll);

export default app;
