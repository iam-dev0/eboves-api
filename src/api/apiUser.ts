import express from "express";
import { login } from "../controllers/controllerUsers";

const app = express();



app.post("/login", login);





export default app;