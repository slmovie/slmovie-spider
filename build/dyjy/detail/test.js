"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const detailSpider_1 = require("./detailSpider");
// SaveDetail("4");
detailSpider_1.startDetailSpider(1000, 1000, () => {
    console.log("Update Detail Finish");
});
// const test = new DetailSpider();
// test.getDatail("4", (result: IDetails) => {
//   console.log(result);
// });
