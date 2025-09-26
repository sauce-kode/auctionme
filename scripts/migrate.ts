import fs from "node:fs";
import path from "node:path";
import { pool } from "../src/db";

async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id serial primary key,
      migration_name text not null unique,
      applied_at timestamptz not null default now()
    );
  `);
}

async function appliedSet(): Promise<Set<string>> {
  const { rows } = await pool.query<{ migration_name: string }>(
    `SELECT migration_name FROM schema_migrations`
  );
  return new Set(rows.map((r: { migration_name: any }) => r.migration_name));
}

async function main() {
  await ensureTable();
  // create migrations directory if it doesn't exist
  if (!fs.existsSync(path.join(process.cwd(), "migrations"))) {
    fs.mkdirSync(path.join(process.cwd(), "migrations"));
  }
  const dir = path.join(process.cwd(), "migrations");
  const migration_files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".sql"))
    .sort();
  const done = await appliedSet();

  for (const migration_file of migration_files) {
    if (done.has(migration_file)) continue;
    const sql = fs.readFileSync(path.join(dir, migration_file), "utf8");
    console.log("Applying", migration_file);
    await pool.query("BEGIN");
    try {
      await pool.query(sql);
      await pool.query(
        `INSERT INTO schema_migrations (migration_name) VALUES ($1)`,
        [migration_file]
      );
      await pool.query("COMMIT");
    } catch (e) {
      await pool.query("ROLLBACK");
      throw e;
    }
  }
  await pool.end();
  console.log("Migrations complete");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
