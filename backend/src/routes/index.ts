import { Router } from "express";
import authRoute from "./auth.routes"
import taskRoute from "./task.routes"

const router = Router();

router.use("/api/auth", authRoute);
router.use("/api/task", taskRoute);

export default router;