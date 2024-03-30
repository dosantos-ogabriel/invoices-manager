import { Prisma } from "@prisma/client";
import { z } from "zod";
import prisma from "./database";

class Invoice {
  async list() {
    const invoices = await prisma.invoice.findMany({
      orderBy: [{ year: "desc" }, { month: "desc" }],
      include: {
        payments: { where: { amount: { gte: 0 } } },
      },
    });
    return invoices.map((invoice) => ({
      ...invoice,
      amount: invoice.payments.reduce((acc, cur) => acc + cur.amount, 0),
    }));
  }

  async addInvoice(body: Prisma.InvoiceCreateInput) {
    const addInvoiceSchema = z.object({
      bank: z.string(),
      year: z.number(),
      month: z.number(),
    });

    const data = addInvoiceSchema.parse(body);

    const existingInvoice = await prisma.invoice.findFirst({
      where: {
        bank: {
          equals: body.bank,
        },
        year: {
          equals: body.year,
        },
        month: {
          equals: body.month,
        },
      },
    });

    if (existingInvoice) {
      throw new Error("Essa fatura já foi registrada no sistema");
    }

    const invoice = await prisma.invoice.create({ data });
    return invoice;
  }
}

export default new Invoice();
