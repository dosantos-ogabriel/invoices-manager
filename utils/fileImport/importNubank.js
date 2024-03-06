const nubankColumns = ["date", "title", "amount", "category"];

export const getPayments = async (fileBinary) => {
  const lines = fileBinary.split("\n");

  const columns = lines[0].split(",");
  if (columns.length !== nubankColumns.length || columns.find((col) => !nubankColumns.includes(col)))
    throw new Error("Formato do arquivo não aceito");

  lines.splice(0, 1);

  return lines
    .map((line) => {
      const rowData = line.split(",");

      const data = columns.reduce((acc, cur, i) => {
        acc[cur] = rowData[i];
        return acc;
      }, {});

      if (data["date"] && data["amount"]) {
        data.date = new Date(data.date);
        data.amount = parseFloat(data.amount);

        return data;
      }
      return undefined;
    })
    .filter((l) => !!l);
};

export const getInvoice = async (fileName) => {
  const nubankFile = new RegExp(/nubank-\d+-\d+.csv/);

  const validFileName = nubankFile.test(fileName);

  if (!validFileName)
    throw new Error('Fazer upload de arquivo com nome padrão para arquivos nubank: "nubank-[ano]-[mês].csv"');

  const array = fileName.slice(0, -4).split("-"),
    bank = array[0],
    year = parseInt(array[1]),
    month = parseInt(array[2]);

  return { bank, year, month };
};
