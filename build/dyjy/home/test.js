"use strict";
// import { startHomeSpider, getMaxLength } from "./homeSpider";
// getMaxLength((length: number) => {
//   console.log(length);
// });
// startHomeSpider(() => {
//   console.log("All finish");
// });
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const myReq = request_1.default.defaults({ "proxy": "http://1.20.97.238:30869" });
myReq.get("http://www.idyjy.com", { encoding: "binary", timeout: 1000 }, (error, response, res) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log(response);
    }
});
