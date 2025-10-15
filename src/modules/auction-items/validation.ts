import z from "zod";

export const createAuctionItemSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    startingPrice: z.number(),
    bidIncrement: z.number(),
    startsAt: z.coerce.date(),
    endsAt: z.coerce.date(),
    images: z.array(z.string().url("Invalid image URL")).optional(),
  })
  .refine((data) => data.endsAt > data.startsAt, {
    message: "End date must be after start date",
    path: ["endsAt"],
  })
  .refine((data) => data.startsAt > new Date(), {
    message: "Start date must be in the future",
    path: ["startsAt"],
  });
