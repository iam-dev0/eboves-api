import express from "express";
import {
  getProducts,
  updateProductStatus,
  createProduct,
  getSingleProduct,
  createVariations,
  getVaraitions,
  getVaraition,
} from "../controllers/controllerProducts";
const app = express();

app.get("/", getProducts);
app.get("/:id", getSingleProduct);
app.post("/", createProduct);

app.post("/:Pid/variations", createVariations);
app.get("/:Pid/variations", getVaraitions);
app.get("/variation/:Vid", getVaraition);

app.put("/:id/status", updateProductStatus);

export default app;
