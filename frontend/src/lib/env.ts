if (!process.env.SPREADSHEET_URL) {
    throw new Error("SPREADSHEET_URL is not defined");
}

export const spreadsheetUrl = process.env.SPREADSHEET_URL;

if (!process.env.ORIGIN_URL) {
    throw new Error("ORIGIN_URL is not defined");
  }
  
export const originUrl = process.env.ORIGIN_URL;
