import payment from "~/server/src/payment";

export default defineEventHandler(async () => {
  const categories = await payment.getCategories();

  return categories.map((c) => c.category);
});
