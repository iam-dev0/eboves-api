import express from "express";
import { getBrands,create,getBrand, uploadImage } from "../controllers/controllerBrands";
import sendUploadToGCS from "../google/ImageUploaderMiddleware";
import upload from "../Middlewares/multer";
const app = express();



app.get("/", getBrands);
app.get("/:id", getBrand);
app.post("/",create);
app.post("/upload",upload.single("file"),sendUploadToGCS,uploadImage);

export default app;