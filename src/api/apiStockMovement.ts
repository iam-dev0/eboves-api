import express from "express";
import { createStockOrder,getOne, getPDF, getAll } from "../controllers/controllerStockMovement";


const app = express();
app.get("/",getAll);
app.get("/:id", getOne);
app.get("/generate-pdf/:id", getPDF);
app.post("/stockOrder", createStockOrder);



export default app;
