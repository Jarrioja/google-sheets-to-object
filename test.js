const {
  getAuthToken,
  getSpreadSheet,
  getSpreadSheetValues,
} = require("./googleSheetsService");

const url =
  "https://docs.google.com/spreadsheets/d/1PZMEyiHiE0LSa5hUjZH-RoV7Lo5X5L4yOVQZb3IG7NE/edit#gid=0"; //Se requiere URL

const spreadsheetId = url.match("(?<=/spreadsheets/d/)(.*)[/]")[1];

const sheetName = "Hoja 1"; // Se requiere Nombre de la Hoja

async function testGetSpreadSheet() {
  try {
    const auth = await getAuthToken();
    const response = await getSpreadSheet({
      spreadsheetId,
      auth,
    });
    console.log(
      "output for getSpreadSheet",
      JSON.stringify(response.data.sheets, null, 2)
    );
    // console.log(response.data.sheets[0].properties.title);
  } catch (err) {
    console.log(err.message, err.stack);
  }
}

async function testGetSpreadSheetValues() {
  try {
    const auth = await getAuthToken();
    const response = await getSpreadSheetValues({
      spreadsheetId,
      sheetName,
      auth,
    });
    console.log(
      "output for getSpreadSheetValues",
      JSON.stringify(response.data, null, 2)
    );
  } catch (err) {
    console.log(err.message, err.stack);
  }
}

async function getColumns() {
  const auth = await getAuthToken();
  const response = await getSpreadSheetValues({
    spreadsheetId,
    sheetName,
    auth,
  });
  let obj = {};
  const rawColumns = response.data.values;
  rawColumns.forEach((col) => {
    let colIndex = col.shift();
    obj[colIndex] = col;
  });
  return obj;
}

async function main() {
  const columns = await getColumns();

  console.log(columns);
}

main();
