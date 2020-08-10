import express from "express";
import {
  getAllCategories,
  create,
  update,
  getSubCategories,
  getNestedCategories,
  getCategory,
  toggleActiveStatus,
  getCategoriessWebsite,
  bulkDelete,
  getCategoryWebsite,
} from "../controllers/controllerCategories";
const app = express();

app.post("/", create);

app.get("/", getAllCategories);
app.get("/nested", getNestedCategories);
app.get("/:id", getCategory);

app.put("/toggle-active/:id", toggleActiveStatus);
app.put("/:id", update);

app.get("/childs/:categoryId", getSubCategories);
app.delete("/", bulkDelete);


//--------------------Website Api-----------------------------------------------//
export const WebsiteApp = express();
WebsiteApp.get("/", getCategoriessWebsite);
WebsiteApp.get("/:slug", getCategoryWebsite);



export default app;
