import SaveDetail from "./detailSave";
import { IStatus } from "../../typings/status";

export const startDetailSpider = (start: number, end: number, resolve: any) => {
  try {
    const exculdes = [14514, 14515, 14455, 14452, 14448, 14439];
    if (exculdes.indexOf(start) === -1) {
      SaveDetail(String(start), (result: IStatus) => {
        console.log(JSON.stringify(result));
        if (start >= end) {
          startDetailSpider(start - 1, end, resolve);
        } else {
          resolve();
        }
      });
    } else {
      startDetailSpider(start - 1, end, resolve);
    }
  } catch (error) {
    console.log("startDetailSpider>>>reject>>>" + JSON.stringify(error));
    startDetailSpider(start, end, resolve);
  }
};