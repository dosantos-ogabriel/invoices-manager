export const formatDate = (date: Date) => {
  return Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
  }).format(date);
};

export const readFileURL = (fileToRead: File) => {
  return new Promise((resolve) => {
    const fReader = new FileReader();

    fReader.onload = () => {
      resolve(fReader.result);
    };

    fReader.readAsDataURL(fileToRead);
  });
};

export const readFileAsString = (fileToRead: File) => {
  return new Promise((resolve) => {
    const fReader = new FileReader();

    fReader.onload = () => {
      resolve(fReader.result);
    };

    fReader.readAsText(fileToRead, "utf-8");
  });
};

export const paginate = <T>(data: T[], currentPage: number, itemsPerPage = 20): T[] => {
  return data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
};

export const clearObject = (obj: object) => {
  for (const [key, value] of Object.entries(obj)) {
    if (!value) delete obj[key as keyof typeof obj];
  }
  return obj;
};

export const formatMoney = (amount: number) => {
  const fixedAmount = amount.toFixed(2);

  return `R$ ${fixedAmount.replace(".", ",")}`;
};

export const capitalize = (str: string | null) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
