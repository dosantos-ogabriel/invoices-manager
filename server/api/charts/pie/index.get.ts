import payment from "~/server/src/payment";

export default defineEventHandler(async () => {
  const data = await payment.getAmountByCategory();

  return data;
});
