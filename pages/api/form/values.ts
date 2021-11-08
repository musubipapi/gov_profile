require("dotenv").config();

import type { NextApiRequest, NextApiResponse } from "next";
import {
  appendSpreadSheetValues,
  getAuthToken,
  getSpreadSheetValues,
} from "../../../services/googleSheetsService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method, query } = req;
    const { name, type } = query;
    const auth = await getAuthToken();
    const spreadsheetId = process.env.SPREADSHEET_ID as string;
    if (!name || !type) {
      return res.status(400).json({ success: false });
    }
    switch (method) {
      case "GET":
        if (type === "pk") {
          const sheet = await getSpreadSheetValues({
            auth,
            spreadsheetId,
            //get the primary key
            sheetName: `${name}!B:B`,
          });
          const data = sheet?.data.values;
          res.status(200).json({ data });
        } else if (type === "row") {
          const rowNumber = Number(query.row);
          const sheet = await getSpreadSheetValues({
            auth,
            spreadsheetId,
            //get the primary key
            sheetName: `${name}!${rowNumber}:${rowNumber}`,
          });
          const data = sheet?.data.values;
          res.status(200).json({ data });
        }
        break;
      //   case "POST":
      //     const { body } = req;
      //     const { formValues } = body;
      //     console.log(formValues);
      //     const updatedSheet = await appendSpreadSheetValues({
      //       auth,
      //       spreadsheetId,
      //       sheetName: `${name}!A:A`,
      //       values: [formValues],
      //     });
      //     res.status(200).json({ updatedSheet: true });
      //     break;
      default:
        res.status(400).json({ success: false });
        break;
    }
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
}
