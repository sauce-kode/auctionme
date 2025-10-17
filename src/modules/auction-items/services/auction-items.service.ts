import { AuctionItemWithImages } from "../types";
import {
  countAuctionItems,
  fetchActiveAuctionItems,
  fetchAuctionItems,
  fetchUpcomingAuctionItems,
} from "../repositories";

type ListType = "upcoming" | "active";

export const getAuctionItemsService = async (
  page: number,
  limit: number,
  type?: ListType
) => {
  const offset = (page - 1) * limit;
  let items: AuctionItemWithImages[] = [];
  if (type) {
    if (type == "active") {
      await fetchActiveAuctionItems(limit, offset);
    } else {
      await fetchUpcomingAuctionItems(limit, offset);
    }
  }

  items = await fetchAuctionItems(limit, offset);
  const total = await countAuctionItems();
  const totalPages = Math.ceil(total / limit);

  return {
    items,
    meta: {
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    },
  };
};
