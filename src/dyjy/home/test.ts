import { startHomeSpider, getMaxLength } from "./homeSpider";
getMaxLength((length: number) => {
  console.log(length);
});
startHomeSpider(() => {
  console.log("All finish");
});