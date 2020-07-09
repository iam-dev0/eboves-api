import express from "express";
import { getAllCategories, getSubCategories, getNestedCategories } from "../controllers/controllerCategories";
const app = express();



app.get("/", getAllCategories);
app.get("/nested", getNestedCategories);

app.get("/childs/:categoryId", getSubCategories);
export default app;