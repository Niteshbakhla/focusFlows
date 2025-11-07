import express, { Application } from "express";
import { globalError } from "./middlewares/globalError";
import cors from "cors";
import router from "./routes";

const app: Application = express();

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
            res.send("hey bro it is working")
})

app.use("/", router)



app.use(globalError);


export default app;