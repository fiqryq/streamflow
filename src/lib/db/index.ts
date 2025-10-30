import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db', 'streamflow.db');
const sqlite = new Database(dbPath);

// Enable WAL mode for better concurrent access
sqlite.pragma('journal_mode = WAL');

export const db = drizzle(sqlite, { schema });

// Helper function to check if users exist
export async function checkIfUsersExist(): Promise<boolean> {
  const result = await db.select().from(schema.users);
  return result.length > 0;
}
