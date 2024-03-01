export const formatDate = (date: Date) => {
  return Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
  }).format(date);
};
