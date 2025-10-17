export type AuctionItem = {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  description: string;
  starting_price: number;
  starts_at: string;
  ends_at: string;
  bid_increment: number;
  created_at: string;
  updated_at: string;
};

export type AuctionItemImage = {
  id: number;
  auction_item_id: string;
  image_url: string;
  is_primary: boolean;
  created_at: string;
};

export type AuctionItemWithImages = AuctionItem & {
  images: AuctionItemImage[];
};
