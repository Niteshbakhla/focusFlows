import { Router } from "express"
import { loginUser, refreshAccessToken, registerUser } from "../controllers/auth.controller";

const router = Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser)
router.route("/refresh-token").post(refreshAccessToken)

export default router;