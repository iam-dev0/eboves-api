import express from "express";
import { getAllCategories, getSubCategories } from "../controllers/controllerCategories";
const app = express();



app.get("/", getAllCategories);


app.get("/childs/:categoryId", getSubCategories);
export default app;