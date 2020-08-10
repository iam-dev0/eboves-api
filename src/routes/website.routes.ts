import express from "express";
const app = express();
import { WebsiteApp as BannerRoutes } from "../api/apiBanners";
import { WebsiteApp as BrandsRoutes} from "../api/apiBrands";
import {WebsiteApp as ProductRoutes} from "../api/apiProducts";
import {WebsiteApp as CategoryRoutes} from "../api/apiCategories";

app.use("/banners", BannerRoutes);
app.use("/brands",BrandsRoutes);
app.use("/categories",CategoryRoutes);
app.use("/products",ProductRoutes);


export default express().use("/v1", app);
