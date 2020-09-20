import express from "express";
import {
  createStockOrder,
  getOne,
  getPDF,
  getAll,
  receiveStockOrder,
  updateStockOrderStatus,
} from "../controllers/controllerStockMovement";

const app = express();
app.get("/", getAll);
app.get("/:id", getOne);
app.get("/generate-pdf/:id", getPDF);
app.post("/stockOrder", createStockOrder);
app.post("/receive-order", receiveStockOrder);

app.put(
  "/cancel-order/:id",
  (req, res, next) => {
    req.query.status = "CANCELED";
    next();
  },
  updateStockOrderStatus
);

app.put(
  "/send-order/:id",
  (req, res, next) => {
    req.query.status = "SENT";
    next();
  },
  updateStockOrderStatus
);

export default app;
