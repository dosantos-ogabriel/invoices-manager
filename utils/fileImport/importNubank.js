const nubankColumns = ["date", "title", "amount", "category"];

export default async (fileBinary) => {
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
