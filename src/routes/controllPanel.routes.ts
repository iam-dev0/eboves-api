import express from "express";
const app = express();
import CountriesRoutes from "../api/apiCountries";
import ProductsRoutes from "../api/apiProducts";
import BrandsRoutes from "../api/apiBrands";
import SuppliersRoutes from "../api/apiSuppliers";
import CategorisRouts from "../api/apiCategories";
import AttributesRoutes from "../api/apiAttributes";
import OutletsRoutes from "../api/apiOutlets";
import StocksRoutes from "../api/apiStockMovement";
import sendUploadToGCS from "../google/ImageUploaderMiddleware";
import upload from "../Middlewares/multer";

app.use("/countries", CountriesRoutes);
app.use("/products", ProductsRoutes);
app.use("/brands", BrandsRoutes);
app.use("/suppliers", SuppliersRoutes);
app.use("/categories", CategorisRouts);
app.use("/attributes", AttributesRoutes);
app.use("/outlets", OutletsRoutes);
app.use("/stocks", StocksRoutes);


app.use("/upload", upload.single("file"), sendUploadToGCS);

export default app;
