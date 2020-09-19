import express from "express";
import { create } from "../controllers/ControllerCore";


const app = express();


app.post("/contact-us", create);

export default app;



