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
  getMainTabs,
  getWebsiteProducts,
  searchVariations,
  getWebsiteProduct,
  getStock,
} from "../controllers/controllerProducts";
const app = express();

app.get("/", getProducts);
app.get("/:id", getSingleProduct);
app.get("/:id/full", getProductFullInfo);
app.post("/", createProduct);
app.put("/:id", updateProduct);
app.delete("/", bulkDelete);

app.post("/:id/variations", createVariations);

app.get("/search/variations", searchVariations);

app.get("/:Pid/variations", getVaraitions);
app.get("/:pid/variation/:vid", getVaraition);

app.put("/:id/status", toggleProductActiveStatus);
app.put("/:pid/variation/:vid/status", toggleProductActiveStatus);
//------------------------------------------Website Api---------------------//
export const WebsiteApp = express();
WebsiteApp.get("/main-tabs", getMainTabs);
WebsiteApp.get("/", getWebsiteProducts);
WebsiteApp.get("/get-stock",getStock);
WebsiteApp.get("/:slug",getWebsiteProduct);

export default app;
