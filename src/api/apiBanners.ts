import express from "express";
import {
  getAll,
  toggleActiveStatus,
  bulkDelete,
  create,
  update,
  getBanners,
} from "../controllers/controllerBanners";

const app = express();

app.get("/", getAll);
app.delete("/", bulkDelete);
app.post("/", create);
app.put("/:Aid", update);
app.put("/toggle-active/:Aid", toggleActiveStatus);

//---------------------------Website Route--------------------//
export const WebsiteApp = express();

WebsiteApp.get("/", getBanners);

export default app;
