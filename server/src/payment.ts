import { z } from "zod";
import prisma from "./database";
import { Prisma } from "@prisma/client";

class Payment {
	async list() {
		const payments = await prisma.payment.findMany();
		return payments;
	}

	async addPayment(data: Prisma.PaymentCreateInput) {
		const addPaymentSchema = z.object({
			title: z.string().optional(),
			category: z.string().optional(),
			amount: z.number().nonnegative(),
			date: z.coerce.date(),
		});

		data = addPaymentSchema.parse(data);

		const payment = await prisma.payment.create({ data });
		return payment;
	}
}

export default new Payment();
