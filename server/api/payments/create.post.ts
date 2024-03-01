import * as Payments from "~/server/src/payment";
import { getDatabase } from "~/server/src/database";

export default defineEventHandler(async (event) => {
	const db = await getDatabase();
	const body = await readBody(event);
	return Payments.add(db, body);
});
