import { DatabaseConnection, sql } from "@databases/sqlite";
import { randomUUID } from "node:crypto";
import { z } from "zod";

interface Payment {
	id: string;
	title?: string;
	category?: string;
	amount: number;
	date: Date;
}

interface AddPayment {
	title?: string;
	category?: string;
	amount: number;
	date: Date;
}

const addPaymentSchema = z.object({
	title: z.string().optional(),
	category: z.string().optional(),
	amount: z.number().nonnegative(),
	date: z.coerce.date(),
});

export async function list(db: DatabaseConnection) {
	return db.query(sql`SELECT * FROM payments`);
}

export async function add(db: DatabaseConnection, data: AddPayment) {
	const params = addPaymentSchema.parse(data);

	const payment: Payment = {
		id: randomUUID(),
		...params,
	};

	await db.query(sql`INSERT INTO payments (
      id,
      title,
      category,
      amount,
      date
    ) VALUES (
      ${payment.id},
      ${payment.title},
      ${payment.category},
      ${payment.amount},
      ${payment.date}
    )`);
	return payment;
}
