import { dbToApi, handleControllerError, sendSuccess } from "../../../utils";
import { getAuctionItemsService } from "../services";
import { Request, Response } from "express";

export const createAuctionItem = (req: Request, res: Response) => {};

export const getAuctionItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getAuctionItemsService();
    sendSuccess(
      res,
      "Auction items successfully fetched",
      200,
      result.map(dbToApi)
    );
  } catch (error) {
    handleControllerError(res, error);
  }
};
