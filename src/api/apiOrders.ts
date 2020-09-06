import express from "express";
import { create,checkStock, getAll,getOne } from "../controllers/controllerOrders";

const app = express();
app.get("/",getAll);
app.post("/place-order",checkStock, create);
app.get("/:id", getOne);



//---------------------------------Website Route----------//
export const WebsiteApp = express();
WebsiteApp.post("/place-order",checkStock, create);
export default app;
