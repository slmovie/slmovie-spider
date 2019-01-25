"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const detailSave_1 = __importDefault(require("./detailSave"));
detailSave_1.default("26113", (result) => {
    console.log(result.error);
});
// startDetailSpider(1000, 1000, () => {
//   console.log("Update Detail Finish");
// });
// const test = new DetailSpider();
// test.getDatail("4", (result: IDetails) => {
//   console.log(result);
// });
