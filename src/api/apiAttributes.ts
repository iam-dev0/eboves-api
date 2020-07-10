import express from "express";
import { getAttributes, toggleActiveStatus, bulkDelete,create ,update} from "../controllers/controllerAttributes";
const app = express();



app.get("/", getAttributes);
app.delete("/", bulkDelete);
app.post("/",create);

app.put("/:Aid",update);

app.put("/toggle-active/:Aid", toggleActiveStatus);

export default app;