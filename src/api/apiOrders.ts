import express from "express";
import { create, update,checkStock, getAll } from "../controllers/controllerOrders";

const app = express();
app.get("/",getAll);
app.post("/place-order",checkStock, create);
app.put("/:id", update);

export default app;
