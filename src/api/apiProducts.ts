import express from "express";
import { getProducts,updateProductStatus } from "../controllers/controllerProducts";
const app = express();



app.get("/", getProducts);

app.put("/:id/status", updateProductStatus);

export default app;