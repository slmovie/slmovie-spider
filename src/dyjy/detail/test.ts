import SaveDetail from "./detailSave";
import { startDetailSpider } from "./detailSpider";
import DetailSpider from "./detail";
import { IDetails } from "../../typings/detailResponse";

// SaveDetail("4");
startDetailSpider(0, 1000, () => {
  console.log("Update Detail Finish");
});
// const test = new DetailSpider();
// test.getDatail("4", (result: IDetails) => {
//   console.log(result);
// });