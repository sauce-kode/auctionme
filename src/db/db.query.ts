import { pool } from "./db.pool";
import { QueryResultRow } from "pg";

// q = query
export const q = {
  many: async <T extends QueryResultRow>(text: string, params?: any[]) => {
    const { rows } = await pool.query<T>(text, params);
  },
  one: async <T extends QueryResultRow>(text: string, params?: any[]) => {
    const { rows } = await pool.query<T>(text, params);
    if (rows.length !== 1) throw new Error("Single row expected");
    return rows[0];
  },
  maybeOne: async <T extends QueryResultRow>(text: string, params?: any[]) => {
    const { rows } = await pool.query<T>(text, params);
    return rows[0] ?? null;
  },
};
