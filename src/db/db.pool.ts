import { Pool } from "pg";
import "./db.types";
import { env } from "../config";
import { logger } from "../utils";

export const pool = new Pool({
  connectionString: env.DB_URL,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

pool.on("connect", () => logger.debug("PG: client connected"));
pool.on("error", (err) => logger.error({ err }, "PG: client connection error"));
