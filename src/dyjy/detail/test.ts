import SaveDetail from "./detailSave";
import { startDetailSpider } from "./detailSpider";
import DetailSpider from "./detail";
import { IDetails } from "../../typings/detailResponse";
import { IStatus } from "../../typings/status";

SaveDetail("14099", (result: IStatus) => {
  console.log(result.error);
});
// startDetailSpider(1000, 1000, () => {
//   console.log("Update Detail Finish");
// });
// const test = new DetailSpider();
// test.getDatail("4", (result: IDetails) => {
//   console.log(result);
// });
