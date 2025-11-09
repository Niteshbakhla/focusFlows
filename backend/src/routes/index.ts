import { Router } from "express";
import authRoute from "./auth.routes";
import taskRoute from "./task.routes";
import aiRoute from "./ai.routes";

const router = Router();

router.use("/api/auth", authRoute);
router.use("/api/task", taskRoute);
router.use("/api/ai", aiRoute);

export default router;