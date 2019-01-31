"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const homeSpider_1 = require("./homeSpider");
homeSpider_1.getMaxLength((length) => {
    console.log(length);
});
// startHomeSpider(() => {
//   console.log("All finish");
// });
// import request from "request";
// const myReq = request.defaults({ "proxy": "http://1.20.97.238:30869" });
// myReq.get("http://www.idyjy.com",
//   { encoding: "binary", timeout: 1000 },
//   (error, response, res) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(response);
//     }
//   });
