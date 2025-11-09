import { Router } from "express";
import { improveTask } from "../controllers/ai.controller";
import authMiddleware from "../middlewares/auth.middleware";


const router = Router();


router.route("/improve").post(authMiddleware, improveTask);

export default router;
