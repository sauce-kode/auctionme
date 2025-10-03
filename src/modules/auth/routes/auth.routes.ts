import { signup } from "../controllers";
import { Router } from "express";

const router = Router();

router.post("/signup", signup);

export default router;
