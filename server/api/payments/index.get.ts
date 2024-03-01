import { getDatabase } from "~/server/src/database";
import * as Payments from "~/server/src/payment";

export default defineEventHandler(async (event) => {
	const db = await getDatabase();
	return Payments.list(db);
});
