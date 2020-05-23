import express from "express";
import { getApi } from "../controllers/controllerCountries";
const app = express();


app.get("/", getApi);



export default app;