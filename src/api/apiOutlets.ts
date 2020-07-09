import express from "express";
import { getOutlets } from "../controllers/controllerOutlets";

const app = express();

app.get("/", getOutlets);


export default app;
