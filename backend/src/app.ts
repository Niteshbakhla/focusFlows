import express, { Application } from "express";
import { globalError } from "./middlewares/globalError";
import cors from "cors";
import router from "./routes";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use("/", router)



app.use(globalError);


export default app;