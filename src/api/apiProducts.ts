import express from "express";
import { getProducts,updateProductStatus,createProduct, getSingleProduct } from "../controllers/controllerProducts";
const app = express();


app.get("/", getProducts);
app.get("/:id", getSingleProduct);
app.post("/",createProduct);

app.put("/:id/status", updateProductStatus);

export default app;