import { checkAuth } from "../../../middlewares";
import { createAuctionItem, getAuctionItems } from "../controllers";
import { Router } from "express";

const router = Router();

router.get("/", getAuctionItems);
router.post("/", checkAuth, createAuctionItem);

export default router;
