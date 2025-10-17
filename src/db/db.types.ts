import pg from "pg";

// 1700 is the OID for Numeric/Decimal types in postgres
// 1082 is the OUD for Date
// 1184 is the OID for TIMESTAMPTZ (timestamp with time zone)
pg.types.setTypeParser(1700, (v) => Number(v));
pg.types.setTypeParser(1082, (v) => v);
pg.types.setTypeParser(1184, (v) => v);
