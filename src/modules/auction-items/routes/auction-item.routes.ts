import { checkAuth } from "../../../middlewares";
import { createAuctionItem } from "../controllers";
import { Router } from "express";

const router = Router();

router.post("/", checkAuth, createAuctionItem);

export default router;
