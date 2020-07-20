import express from "express";
import {
  getSuppliers,
  create,
  update,
  bulkDelete,
  toggleActiveStatus,
  getBrand,
} from "../controllers/controllerSuppliers";
const app = express();

app.get("/", getSuppliers);
app.get("/:id", getBrand);
app.post("/", create);
app.put("/:id", update);
app.delete("/", bulkDelete);

app.put("/toggle-active/:id", toggleActiveStatus);

export default app;
