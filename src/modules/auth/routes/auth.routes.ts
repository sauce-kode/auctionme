import {
  forgotPassword,
  login,
  signup,
  verifyResetPasswordOtp,
} from "../controllers";
import { Router } from "express";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-password-reset", verifyResetPasswordOtp);

export default router;
