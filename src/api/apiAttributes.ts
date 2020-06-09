import express from "express";
import { getAttributes } from "../controllers/controllerAttributes";
const app = express();



app.get("/", getAttributes);

export default app;