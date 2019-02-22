import { startHomeSpider, getMaxLength } from "./homeSpider";
import { getTimeFormat } from "../../utils/DateFormat";
getMaxLength((length: number) => {
  console.log(length);
});
startHomeSpider(() => {
  console.log("All finish");
});

console.log(getTimeFormat(Date.now()));

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