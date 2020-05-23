import express from "express";
const app = express();
import CountriesRoutes from "./api/apiCountries";
import ProductsRoutes from "./api/apiProducts";
import BrandsRoutes from "./api/apiBrands";


app.use("/country",CountriesRoutes);
app.use("/products",ProductsRoutes);
app.use("/brands",BrandsRoutes);

export default app;