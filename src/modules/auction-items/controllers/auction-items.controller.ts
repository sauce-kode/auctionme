import {
  dbToApi,
  handleControllerError,
  sendError,
  sendSuccess,
} from "../../../utils";
import { getAuctionItemsService } from "../services";
import { Request, Response } from "express";

export const createAuctionItem = (req: Request, res: Response) => {};

export const getAuctionItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const type = req.query.type as string;

    if (page < 1 || limit < 1 || limit > 100) {
      sendError(res, "Invalid pagination params", 400);
      return;
    }

    const result = await getAuctionItemsService(page, limit);
    sendSuccess(res, "Auction items successfully fetched", 200, {
      items: result.items.map(dbToApi),
      meta: result.meta,
    });
  } catch (error) {
    handleControllerError(res, error);
  }
};
