import express from "express";
import { create,checkStock, getAll,getOne, updateStatus } from "../controllers/controllerOrders";

const app = express();
app.get("/",getAll);
app.post("/place-order",checkStock, create);
app.get("/:id", getOne);
app.put("/", updateStatus);


//---------------------------------Website Route----------//
export const WebsiteApp = express();
WebsiteApp.post("/place-order",checkStock, create);
export default app;
