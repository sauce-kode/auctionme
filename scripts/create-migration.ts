import path from "node:path";
import fs from "node:fs";

function generateTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}_${hour}${minute}${second}`;
}

function createMigrationFile(fileName: string, description: string): void {
  // create migrations directory if it doesn't exist
  if (!fs.existsSync(path.join(process.cwd(), "migrations"))) {
    fs.mkdirSync(path.join(process.cwd(), "migrations"));
  }
  const migrationsDir = path.join(process.cwd(), "migrations");

  const filepath = path.join(migrationsDir, fileName);

  // check if file exists already
  if (fs.existsSync(filepath)) {
    console.error(`Migration file ${fileName} already exists`);
    process.exit(1);
  }

  fs.writeFileSync(filepath, "");
  console.log(`Created migration file: ${fileName}`);
}

function sanitizeDescription(description: string): string {
  return description
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // remove special characters
    .replace(/\s+/g, "_") // replace space with underscores
    .replace(/_+/g, "_") // replace multiple underscores with single
    .replace(/^_|_$/g, ""); // replace leading/trailing underscores
}

function main(): void {
  const args = process.argv.slice(2);

  if (args.length == 0) {
    console.log("Usage: npm run gen-migration <description>");
    console.log("Example: npm run gen-migration 'create users table'");
    process.exit(1);
  }

  const description = args.join(" ");
  const timestamp = generateTimestamp();
  const sanitizedDescription = sanitizeDescription(description);
  const fileName = `${timestamp}_${sanitizedDescription}.sql`;

  console.log(`Creating migration: ${description}`);
  console.log(`Filename: ${fileName}`);

  createMigrationFile(fileName, description);
}

main();
