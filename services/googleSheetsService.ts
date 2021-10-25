require("dotenv").config();
import { google } from "googleapis";
const sheets = google.sheets("v4");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const credentials = JSON.parse(
  Buffer.from(
    process.env.GOOGLE_APPLICATION_CREDENTIALS as any,
    "base64"
  ).toString()
);
export const getAuthToken = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });
  const authToken = await auth.getClient();
  return authToken;
};
export const getSpreadSheet = async ({
  spreadsheetId,
  auth,
}: {
  spreadsheetId: string;
  auth: any;
}) => {
  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    auth,
  });
  return res;
};

export const getSpreadSheetValues = async ({
  spreadsheetId,
  auth,
  sheetName,
}: {
  spreadsheetId: string;
  auth: any;
  sheetName: string;
}) => {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      auth,
      range: sheetName,
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const appendSpreadSheetValues = async ({
  values,
  spreadsheetId,
  auth,
  sheetName,
}: {
  values: string[][];
  spreadsheetId: string;
  auth: any;
  sheetName: string;
}) => {
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: sheetName,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: values,
    },
    auth,
  });
  return res;
};
