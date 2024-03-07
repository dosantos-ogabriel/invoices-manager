import { z } from "zod";
import prisma from "./database";
import { Prisma } from "@prisma/client";

class Payment {
  async list() {
    const payments = await prisma.payment.findMany({ orderBy: { date: "desc" } });
    return payments;
  }

  async addPayment(body: Prisma.PaymentCreateInput) {
    const addPaymentSchema = z.object({
      title: z.string().optional(),
      category: z.string().optional(),
      amount: z.number(),
      date: z.coerce.date(),
      invoiceId: z.string(),
    });

    const data = addPaymentSchema.parse(body);

    const payment = await prisma.payment.create({ data });
    return payment;
  }
}

export default new Payment();
