import { startHomeSpider, getMaxLength } from "./home/homeSpider";
import { startDetailSpider } from "./detail/detailSpider";

export default class DyjySpider {
  public start(total: boolean) {
    try {
      getMaxLength((length: number) => {
        console.log("total is " + length);
        let end = 1;
        if (!total) {
          end = length - 1500;
        }
        startHomeSpider(() => {
          startDetailSpider(length, end, () => {
            console.log("Update Finish!");
            process.exit(0);
          });
        });
      });
    } catch (error) {
      console.log("startDyjySpider>>" + JSON.stringify(error));
      process.exit(0);
    }
  }

  public partUpdate(start: number) {
    try {
      startDetailSpider(start, 1, () => {
        console.log("Update Finish!");
        process.exit(0);
      });
    } catch (error) {
      console.log("startDyjySpider>>" + JSON.stringify(error));
      process.exit(0);
    }
  }
}

