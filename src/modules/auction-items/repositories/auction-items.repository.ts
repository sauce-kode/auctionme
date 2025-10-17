import { AuctionItem, AuctionItemImage, AuctionItemWithImages } from "../types";
import { q } from "../../../db/db.query";

const AUCTION_ITEMS_TABLE = "auction_items";
const AUCTION_ITEM_IMAGES_TABLE = "auction_item_images";

export async function fetchAuctionItems(
  limit: number,
  offset: number
): Promise<AuctionItemWithImages[]> {
  const auctionItems = await q.many<AuctionItem>(
    `SELECT * from ${AUCTION_ITEMS_TABLE} ORDER BY ends_at ASC LIMIt $1 OFFSET $2`,
    [limit, offset]
  );

  const itemsWithImages: AuctionItemWithImages[] = [];

  for (const item of auctionItems) {
    const images = await q.many<AuctionItemImage>(
      `SELECT id, auction_item_id, image_url, is_primary FROM ${AUCTION_ITEM_IMAGES_TABLE} WHERE auction_item_id = $1`,
      [item.id]
    );

    itemsWithImages.push({
      ...item,
      images,
    });
  }

  return itemsWithImages;
}

export async function fetchActiveAuctionItems(
  limit: number,
  offset: number
): Promise<AuctionItemWithImages[]> {
  const auctionItems = await q.many<AuctionItem>(
    `SELECT * from ${AUCTION_ITEMS_TABLE} ORDER BY ends_at ASC LIMIt $1 OFFSET $2`,
    [limit, offset]
  );

  const itemsWithImages: AuctionItemWithImages[] = [];

  for (const item of auctionItems) {
    const images = await q.many<AuctionItemImage>(
      `SELECT id, auction_item_id, image_url, is_primary FROM ${AUCTION_ITEM_IMAGES_TABLE} WHERE auction_item_id = $1`,
      [item.id]
    );

    itemsWithImages.push({
      ...item,
      images,
    });
  }

  return itemsWithImages;
}

export async function fetchUpcomingAuctionItems(
  limit: number,
  offset: number
): Promise<AuctionItemWithImages[]> {
  const auctionItems = await q.many<AuctionItem>(
    `SELECT * from ${AUCTION_ITEMS_TABLE} ORDER BY ends_at ASC LIMIt $1 OFFSET $2`,
    [limit, offset]
  );

  const itemsWithImages: AuctionItemWithImages[] = [];

  for (const item of auctionItems) {
    const images = await q.many<AuctionItemImage>(
      `SELECT id, auction_item_id, image_url, is_primary FROM ${AUCTION_ITEM_IMAGES_TABLE} WHERE auction_item_id = $1`,
      [item.id]
    );

    itemsWithImages.push({
      ...item,
      images,
    });
  }

  return itemsWithImages;
}

export async function countAuctionItems(): Promise<number> {
  const result = await q.one<{ count: string }>(
    `SELECT COUNT(*) as count FROM ${AUCTION_ITEMS_TABLE}`
  );
  return parseInt(result.count);
}
