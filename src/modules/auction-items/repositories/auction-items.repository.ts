import { AuctionItem, AuctionItemImage, AuctionItemWithImages } from "../types";
import { q } from "../../../db/db.query";

export async function fetchAuctionItems(): Promise<AuctionItemWithImages[]> {
  const auctionItems = await q.many<AuctionItem>("SELECT * from auction_items");

  const itemsWithImages: AuctionItemWithImages[] = [];

  for (const item of auctionItems) {
    const images = await q.many<AuctionItemImage>(
      "SELECT id, auction_item_id, image_url, is_primary FROM auction_item_images WHERE auction_item_id = $1",
      [item.id]
    );

    itemsWithImages.push({
      ...item,
      images,
    });
  }

  return itemsWithImages;
}
