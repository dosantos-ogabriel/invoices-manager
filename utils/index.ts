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

export const paginate = (data: unknown[], currentPage: number, itemsPerPage = 20) => {
  return data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
};
