import path from "node:path";
import { pool } from "../src/db";
import fs from "node:fs";

const SCHEMA_MIGRATION_TABLE_NAME = "schema_migrations";

// ensure the schema_migrations table has been created; create it if it doesn't exist already
async function ensureTable() {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS ${SCHEMA_MIGRATION_TABLE_NAME} (
    id SERIAL PRIMARY KEY,
    migration_name TEXT NOT NULL UNIQUE,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`
  );
}

// get all the migration files that have already been applied
async function appliedSet(): Promise<Set<string>> {
  const { rows } = await pool.query<{ migration_name: string }>(
    `SELECT migration_name FROM ${SCHEMA_MIGRATION_TABLE_NAME}`
  );

  return new Set(rows.map((r) => r.migration_name));
}

/**
 * 1. ensure that the schema_migrations table exists
 * 2. form the path where the migration files are located
 * 3. get all migration files
 * 4. get all rows of migration files that have been applied.
 * 5. run migration
 */
async function main() {
  await ensureTable();
  const dir = path.join(process.cwd(), "migrations");
  const migrationFiles = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  const done = await appliedSet();

  for (const file of migrationFiles) {
    if (done.has(file)) continue;
    const sql = fs.readFileSync(path.join(dir, file), "utf-8");
    console.log("Applying migration", file);
    await pool.query("BEGIN");
    try {
      await pool.query(sql);
      await pool.query(
        `INSERT INTO ${SCHEMA_MIGRATION_TABLE_NAME} (migration_name) VALUES ($1)`,
        [file]
      );
      await pool.query("COMMIT");
    } catch (error) {
      await pool.query("ROLLBACK");
      throw error;
    }
  }

  await pool.end();
  console.log("Migrations complete");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
