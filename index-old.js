const { GoogleSpreadsheet } = require("google-spreadsheet");
const dotEnv = require("dotenv");
dotEnv.config();

const url =
  "https://docs.google.com/spreadsheets/d/1PZMEyiHiE0LSa5hUjZH-RoV7Lo5X5L4yOVQZb3IG7NE/edit#gid=0";

const id = url.match("(?<=/spreadsheets/d/)(.*)[/]")[1];

const doc = new GoogleSpreadsheet(id); // get from URL
doc.useApiKey(process.env.GOOGLE_SHEET_API_KEY);

async function start() {
  let obj = {};
  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[0]; //load 1st sheet
  const rows = await sheet.getRows();

  await sheet.loadCells();
  const headers = sheet.headerValues;
  console.log();

  headers.forEach((head) => {
    obj[head] = [];
  });

  rows.forEach((row) => {
    obj.name.push(row.name);
    obj.email.push(row.email);
    obj.stockQuantity.push(row.stockQuantity);
  });
  const cellC3 = sheet.getCellByA1("A1");

  return console.log(cellC3.value);
}

start();

/*

  {
    "Nombre": [],
    "Email": [],
    "Cantidad0": []
  }

*/
