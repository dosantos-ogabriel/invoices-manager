import { Prisma } from "@prisma/client";
import { z } from "zod";
import prisma from "./database";

class Payment {
  async list(query: Prisma.PaymentWhereInput) {
    const payments = await prisma.payment.findMany({ orderBy: { date: "desc" }, where: query });
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

  async getCategories() {
    const categories = await prisma.payment.groupBy({ by: ["category"], where: { amount: { gt: 0 } } });
    return categories;
  }
}

export default new Payment();
