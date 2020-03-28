"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const detail_1 = __importDefault(require("./detail"));
// SaveDetail("29841", (result: IStatus) => {
//   console.log(result.error);
// });
// startDetailSpider(1000, 1000, () => {
//   console.log("Update Detail Finish");
// });
const test = new detail_1.default();
test.getDatail("4", (result) => {
    console.log(result);
});
