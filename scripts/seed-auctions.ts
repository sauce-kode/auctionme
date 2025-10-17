import { pool } from "../src/db/db.pool";
import { logger } from "../src/utils/logger.util";

interface AuctionItem {
  title: string;
  description: string;
  startingPrice: number;
  bidIncrement: number;
  startsAt: Date;
  endsAt: Date;
  images?: string[];
}

// Helper function to create dates relative to now
const now = new Date();

const getDate = (hoursOffset: number): Date => {
  const date = new Date(now);
  date.setHours(date.getHours() + hoursOffset);
  return date;
};

const auctionItems: AuctionItem[] = [
  // Active auctions (started, not yet ended)
  {
    title: "Vintage Rolex Submariner Watch",
    description:
      "Authentic Rolex Submariner from 1987 in excellent condition. Comes with original box and papers. This iconic timepiece has been professionally serviced and is ready to wear. A true collector's item with timeless design.",
    startingPrice: 8500.0,
    bidIncrement: 100.0,
    startsAt: getDate(-24), // Started 24 hours ago
    endsAt: getDate(48), // Ends in 48 hours
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d",
    ],
  },
  {
    title: "MacBook Pro 16-inch M3 Max",
    description:
      "Brand new MacBook Pro with M3 Max chip, 64GB RAM, 2TB SSD. Space Black color. Still sealed in original packaging. Perfect for developers, video editors, and creative professionals.",
    startingPrice: 3200.0,
    bidIncrement: 100.0,
    startsAt: getDate(-12),
    endsAt: getDate(36),
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9",
    ],
  },
  {
    title: "Original Picasso Lithograph Print",
    description:
      "Rare Pablo Picasso lithograph print from 1965. Authenticated and certified. Measures 24x30 inches, professionally framed. A museum-quality piece for serious art collectors.",
    startingPrice: 12000.0,
    bidIncrement: 100.0,
    startsAt: getDate(-6),
    endsAt: getDate(42),
    images: ["https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5"],
  },
  {
    title: "Sony A7R V Mirrorless Camera",
    description:
      "Professional full-frame mirrorless camera with 61MP sensor. Includes 24-70mm f/2.8 GM lens, extra batteries, SD cards, and camera bag. Used only for 3 months, in pristine condition.",
    startingPrice: 3200.0,
    bidIncrement: 100.0,
    startsAt: getDate(-18),
    endsAt: getDate(30),
    images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd"],
  },
  {
    title: "Herman Miller Aeron Chair (Size C)",
    description:
      "The iconic Herman Miller Aeron ergonomic office chair in Size C (large). Fully loaded with all features including lumbar support, adjustable arms, and tilt limiter. Black color, like new condition.",
    startingPrice: 600.0,
    bidIncrement: 100.0,
    startsAt: getDate(-10),
    endsAt: getDate(14),
    images: ["https://images.unsplash.com/photo-1592078615290-033ee584e267"],
  },
  {
    title: "Limited Edition Air Jordan 1 Retro High OG",
    description:
      "Deadstock Air Jordan 1 Retro High OG 'Chicago' (2015 release). Size 10.5 US. Never worn, comes with original box and all accessories. A grail for any sneaker collector.",
    startingPrice: 1200.0,
    bidIncrement: 100.0,
    startsAt: getDate(-8),
    endsAt: getDate(16),
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff"],
  },
  {
    title: "Gibson Les Paul Standard '59 Reissue",
    description:
      "Gibson Custom Shop Les Paul Standard Historic 1959 Reissue. Bourbon Burst finish. Hand-selected tonewoods, period-correct details. Includes original hardshell case and certificate of authenticity.",
    startingPrice: 4500.0,
    bidIncrement: 100.0,
    startsAt: getDate(-4),
    endsAt: getDate(44),
    images: ["https://images.unsplash.com/photo-1511379938547-c1f69419868d"],
  },

  // Upcoming auctions (haven't started yet)
  {
    title: "Rare 1st Edition Pokémon Base Set Booster Box",
    description:
      "Factory sealed 1st Edition Pokémon Base Set Booster Box from 1999. Authenticated by PSA. Contains 36 unopened booster packs. Extremely rare collectible item.",
    startingPrice: 25000.0,
    bidIncrement: 100.0,
    startsAt: getDate(12), // Starts in 12 hours
    endsAt: getDate(84),
    images: ["https://images.unsplash.com/photo-1606503153255-59d60450c1a4"],
  },
  {
    title: "Tesla Model S Plaid (2023)",
    description:
      "2023 Tesla Model S Plaid with Full Self-Driving capability. Pearl White Multi-Coat exterior, Black and White Premium interior. Only 5,000 miles. Tri-motor AWD with 1,020 hp. Fastest production sedan available.",
    startingPrice: 85000.0,
    bidIncrement: 100.0,
    startsAt: getDate(24),
    endsAt: getDate(168), // 7 days auction
    images: ["https://images.unsplash.com/photo-1536700503339-1e4b06520771"],
  },
  {
    title: "Bose QuietComfort Ultra Headphones",
    description:
      "Brand new Bose QuietComfort Ultra wireless headphones with spatial audio. World-class noise cancellation, 24-hour battery life. Black color, still sealed in box.",
    startingPrice: 280.0,
    bidIncrement: 100.0,
    startsAt: getDate(6),
    endsAt: getDate(54),
    images: ["https://images.unsplash.com/photo-1545127398-14699f92334b"],
  },
  {
    title: "Vintage Fender Stratocaster 1963",
    description:
      "All-original 1963 Fender Stratocaster in Olympic White. Pre-CBS era, L-series neck, original pickups and electronics. Plays beautifully, collector-grade condition. Includes original case.",
    startingPrice: 18000.0,
    bidIncrement: 100.0,
    startsAt: getDate(36),
    endsAt: getDate(156),
    images: ["https://images.unsplash.com/photo-1510915361894-db8b60106cb1"],
  },
  {
    title: "DJI Mavic 3 Pro Cine Premium Combo",
    description:
      "Professional drone with triple camera system including Hasselblad and dual tele cameras. 4/3 CMOS sensor, Apple ProRes recording. Includes 1TB SSD, RC Pro controller, extra batteries, and carry case.",
    startingPrice: 3800.0,
    bidIncrement: 100.0,
    startsAt: getDate(8),
    endsAt: getDate(80),
    images: ["https://images.unsplash.com/photo-1473968512647-3e447244af8f"],
  },

  // More active auctions
  {
    title: "iPad Pro 12.9-inch M2 (2TB)",
    description:
      "Latest iPad Pro with M2 chip, 12.9-inch Liquid Retina XDR display, 2TB storage, Space Gray. Includes Magic Keyboard and Apple Pencil 2nd Gen. Barely used, in perfect condition.",
    startingPrice: 1600.0,
    bidIncrement: 100.0,
    startsAt: getDate(-20),
    endsAt: getDate(28),
    images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"],
  },
  {
    title: "Dyson Airwrap Complete Multi-Styler",
    description:
      "Complete Dyson Airwrap set with all attachments for multiple hair types. Long Nickel/Copper color. Used twice, essentially brand new. Includes presentation case and heat-resistant travel pouch.",
    startingPrice: 380.0,
    bidIncrement: 100.0,
    startsAt: getDate(-15),
    endsAt: getDate(33),
    images: ["https://images.unsplash.com/photo-1522338242992-e1a54906a8da"],
  },
  {
    title: "Omega Speedmaster Professional Moonwatch",
    description:
      "The legendary Omega Speedmaster Professional 'Moonwatch' with manual-wind chronograph movement. Sapphire crystal case back, black dial with luminous hands. Complete set with box and warranty card.",
    startingPrice: 5200.0,
    bidIncrement: 100.0,
    startsAt: getDate(-30),
    endsAt: getDate(18),
    images: ["https://images.unsplash.com/photo-1614164185128-e4ec99c436d7"],
  },
  {
    title: "Brompton M6L Folding Bike (Special Edition)",
    description:
      "Brompton M6L folding bike in limited edition Racing Green. 6-speed, mudguards, rear rack, Brooks saddle upgrade. Perfect for urban commuting, folds in 20 seconds. Excellent condition.",
    startingPrice: 1200.0,
    bidIncrement: 100.0,
    startsAt: getDate(-5),
    endsAt: getDate(43),
    images: ["https://images.unsplash.com/photo-1485965120184-e220f721d03e"],
  },
];

async function seedAuctions() {
  const client = await pool.connect();

  try {
    logger.info("🌱 Starting auction items seeder...");

    // Start transaction
    await client.query("BEGIN");

    const user = await client.query(
      `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      ["John", "Doe", "johndoe@mail.com", "Password"]
    );
    const userId = user.rows[0].id;
    let insertedCount = 0;
    let skippedCount = 0;

    for (const item of auctionItems) {
      // Check if auction with same title already exists
      const existingCheck = await client.query(
        "SELECT id FROM auction_items WHERE title = $1",
        [item.title]
      );

      if (existingCheck.rows.length > 0) {
        logger.info(`⏭️  Skipping existing auction: "${item.title}"`);
        skippedCount++;
        continue;
      }

      // Insert auction item
      const result = await client.query(
        `INSERT INTO auction_items (user_id, title, description, starting_price, starts_at, ends_at)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [
          userId,
          item.title,
          item.description,
          item.startingPrice,
          item.startsAt,
          item.endsAt,
        ]
      );

      const auctionId = result.rows[0].id;

      // Insert images if provided
      if (item.images && item.images.length > 0) {
        for (let i = 0; i < item.images.length; i++) {
          await client.query(
            `INSERT INTO auction_item_images (auction_item_id, image_url, is_primary)
             VALUES ($1, $2, $3)`,
            [auctionId, item.images[i], i === 0] // First image is primary
          );
        }
      }

      logger.info(`✅ Inserted: "${item.title}" (ID: ${auctionId})`);
      insertedCount++;
    }

    // Commit transaction
    await client.query("COMMIT");

    logger.info("\n" + "=".repeat(60));
    logger.info("🎉 Seeding completed successfully!");
    logger.info(`📊 Statistics:`);
    logger.info(`   - Inserted: ${insertedCount} auction items`);
    logger.info(`   - Skipped: ${skippedCount} (already exist)`);
    logger.info(`   - Total: ${auctionItems.length} items processed`);
    logger.info("=".repeat(60) + "\n");
  } catch (error) {
    // Rollback on error
    await client.query("ROLLBACK");
    logger.error({ error }, "❌ Error seeding auction items");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run seeder
seedAuctions()
  .then(() => {
    logger.info("✨ Seeder process completed");
    process.exit(0);
  })
  .catch((error) => {
    logger.error({ error }, "💥 Seeder process failed");
    process.exit(1);
  });
