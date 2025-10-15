CREATE TABLE IF NOT EXISTS auction_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  starting_price NUMERIC(10,2) NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS auction_item_images (
  id SERIAL PRIMARY KEY,
  auction_item_id UUID REFERENCES auction_items(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_auction_item_title ON auction_items(title);
CREATE INDEX idx_auction_item_user_id ON auction_items(user_id);
CREATE INDEX idx_auction_item_images_auction_item ON auction_item_images(auction_item_id);