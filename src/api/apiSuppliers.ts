import express from "express";
import {
  getAll,
  create,
  update,
  bulkDelete,
  toggleActiveStatus,
  getOne,
} from "../controllers/controllerSuppliers";
const app = express();

app.get("/", getAll);
app.get("/:id", getOne);
app.post("/", create);
app.put("/:id", update);
app.delete("/", bulkDelete);

app.put("/toggle-active/:id", toggleActiveStatus);

export default app;
