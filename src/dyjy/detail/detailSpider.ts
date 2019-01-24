import SaveDetail from "./detailSave";
import { IStatus } from "../../typings/status";

export const startDetailSpider = (start: number, end: number, resolve: any) => {
  try {
    SaveDetail(String(start), (result: IStatus) => {
      console.log(JSON.stringify(result));
      if (start <= end) {
        startDetailSpider(start + 1, end, resolve);
      } else {
        resolve();
      }
    });
  } catch (error) {
    console.log("startDetailSpider>>>reject>>>" + JSON.stringify(error));
    startDetailSpider(start + 1, end, resolve);
  }
};