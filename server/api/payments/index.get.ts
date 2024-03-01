import payment from "~/server/src/payment";

export default defineEventHandler(async () => {
  return payment.list();
});
