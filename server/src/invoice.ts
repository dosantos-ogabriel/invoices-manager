import { z } from "zod";
import prisma from "./database";
import { Prisma } from "@prisma/client";

class Invoice {
  async list() {
    const invoices = await prisma.invoice.findMany();
    return invoices;
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
