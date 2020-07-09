import express from "express";
const app = express();
import CountriesRoutes from "./api/apiCountries";
import ProductsRoutes from "./api/apiProducts";
import BrandsRoutes from "./api/apiBrands";
import SuppliersRoutes from "./api/apiSuppliers";
import CategorisRouts from "./api/apiCategories"; 
import AttributesRoutes from "./api/apiAttributes";
import OutletsRoutes from "./api/apiOutlets";
app.use("/country",CountriesRoutes);
app.use("/products",ProductsRoutes);
app.use("/brands",BrandsRoutes);
app.use("/suppliers",SuppliersRoutes);
app.use("/categories",CategorisRouts);
app.use("/attributes",AttributesRoutes);
app.use("/outlets",OutletsRoutes);


export default app;