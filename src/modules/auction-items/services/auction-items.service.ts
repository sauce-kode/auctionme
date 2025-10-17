import { fetchAuctionItems } from "../repositories";

export const getAuctionItemsService = async () => {
  return await fetchAuctionItems();
};
