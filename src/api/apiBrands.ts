import express from "express";
import {
  getBrands,
  create,
  getBrand,
  update,
  toggleActiveStatus,
  uploadImage,
  bulkDelete,
  toggleFeaturedStatus,
} from "../controllers/controllerBrands";
import sendUploadToGCS from "../google/ImageUploaderMiddleware";
import upload from "../Middlewares/multer";
const app = express();

app.get("/", getBrands);
app.get("/:id", getBrand);

app.post("/", create);
app.put("/:id", update);
app.delete("/", bulkDelete);

app.put("/toggle-active/:id", toggleActiveStatus);

app.put("/toggle-featured/:id", toggleFeaturedStatus);

app.post("/upload", upload.single("file"), sendUploadToGCS, uploadImage);

//--------------------Website Api-----------------------------------------------//
export const WebsiteApp = express();
WebsiteApp.get("/", getBrands);

export default app;
