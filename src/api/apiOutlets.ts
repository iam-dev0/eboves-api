import express from "express";
import { getOutlets,bulkDelete,create,update,toggleActiveStatus} from "../controllers/controllerOutlets";

const app = express();

app.get("/", getOutlets);

app.delete("/", bulkDelete);
app.post("/",create);
app.put("/:id",update);
app.put("/toggle-active/:id", toggleActiveStatus);

export default app;
