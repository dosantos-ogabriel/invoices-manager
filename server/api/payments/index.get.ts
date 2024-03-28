import { z } from "zod";
import payment from "~/server/src/payment";

export default defineEventHandler(async (event) => {
  const queryFormat = z.object({
    invoiceId: z.string().optional(),
    category: z.string().optional(),
  });

  const query = await getValidatedQuery(event, (q) => queryFormat.parse(q));

  return payment.list({ ...query, amount: { gt: 0 } });
});
