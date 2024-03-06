import invoice from "~/server/src/invoice";

export default defineEventHandler(async () => {
  return invoice.list();
});
