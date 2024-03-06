import invoice from "~/server/src/invoice";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return invoice.addInvoice(body);
});
