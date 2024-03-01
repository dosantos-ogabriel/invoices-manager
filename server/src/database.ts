import connect, { DatabaseConnection, sql } from "@databases/sqlite";

let db: DatabaseConnection;
let initialized = false;

export const getDatabase = async () => {
	db = db || connect("../../db.sqlite");

	if (!initialized) {
		await db.query(sql`
    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY,
      title TEXT,
      category TEXT,
      amount NUMERIC NOT NULL,
      date DATETIME NOT NULL
    )`);

		initialized = true;
	}

	return db;
};
