import { startHomeSpider, getMaxLength } from "./home/homeSpider";
import { startDetailSpider } from "./detail/detailSpider";

export const startDyjySpider = (total: boolean) => {
  try {
    getMaxLength((length: number) => {
      console.log("total is " + length);
      let start = length - 2000;
      if (total) {
        start = 0;
      }
      startDetailSpider(start, length, () => {
        startHomeSpider(() => {
          console.log("Update Finish!");
          process.exit(0);
        });
      });
    });

  } catch (error) {
    console.log("startDyjySpider>>" + JSON.stringify(error));
    process.exit(0);
  }
};