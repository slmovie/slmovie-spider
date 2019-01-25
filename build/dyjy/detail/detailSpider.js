"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const detailSave_1 = __importDefault(require("./detailSave"));
exports.startDetailSpider = (start, end, resolve) => {
    try {
        detailSave_1.default(String(start), (result) => {
            console.log(JSON.stringify(result));
            if (start >= end) {
                exports.startDetailSpider(start - 1, end, resolve);
            }
            else {
                resolve();
            }
        });
    }
    catch (error) {
        console.log("startDetailSpider>>>reject>>>" + JSON.stringify(error));
        exports.startDetailSpider(start, end, resolve);
    }
};
