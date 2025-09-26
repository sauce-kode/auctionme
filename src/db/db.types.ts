import pg from "pg";

// 1700 is the OID for Numeric/Decimal types in postgres
// 1082 is the OUD for Date
pg.types.setTypeParser(1700, (v) => Number(v));
// it already returns timestamptz as string
pg.types.setTypeParser(1082, (v) => v);
