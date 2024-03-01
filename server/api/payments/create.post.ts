import payment from "~/server/src/payment";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return payment.addPayment(body);
});
