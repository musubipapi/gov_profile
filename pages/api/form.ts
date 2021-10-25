require("dotenv").config();
import type { NextApiRequest, NextApiResponse } from "next";
import {
  appendSpreadSheetValues,
  getAuthToken,
  getSpreadSheet,
  getSpreadSheetValues,
} from "../../services/googleSheetsService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method, query } = req;
    const { name } = query;
    const auth = await getAuthToken();
    const spreadsheetId = process.env.SPREADSHEET_ID as string;

    switch (method) {
      case "GET":
        const sheet = await getSpreadSheetValues({
          auth,
          spreadsheetId,
          sheetName: `${name}!1:2`,
        });
        const questions = sheet?.data.values;
        res.status(200).json({ questions });
        break;
      case "POST":
        const { body } = req;
        const { formValues } = body;
        const updatedSheet = await appendSpreadSheetValues({
          auth,
          spreadsheetId,
          sheetName: `${name}!A:A`,
          values: [formValues],
        });
        res.status(200).json({ updatedSheet });
        break;
      default:
        res.status(400).json({ success: false });
        break;
    }
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
}
