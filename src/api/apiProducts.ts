import express from "express";
import {
  getProducts,
  toggleProductActiveStatus,
  createProduct,
  getSingleProduct,
  createVariations,
  getVaraitions,
  getVaraition,
  updateProduct,
  getProductFullInfo,
  bulkDelete,
} from "../controllers/controllerProducts";
const app = express();

app.get("/", getProducts);
app.get("/:id", getSingleProduct);
app.get("/:id/full", getProductFullInfo);
app.post("/", createProduct);
app.put("/:id", updateProduct);
app.delete("/", bulkDelete);

app.post("/:id/variations", createVariations);

app.get("/:Pid/variations", getVaraitions);
app.get("/:pid/variation/:vid", getVaraition);

app.put("/:id/status", toggleProductActiveStatus);
app.put("/:pid/variation/:vid/status", toggleProductActiveStatus);

export default app;
