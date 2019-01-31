import { startHomeSpider, getMaxLength } from "./home/homeSpider";
import { startDetailSpider } from "./detail/detailSpider";

export default class DyjySpider {
  public start(total: boolean, range: number) {
    try {
      getMaxLength((length: number) => {
        console.log("total is " + length);
        let end = 1;
        if (!total) {
          end = length - range;
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

  public partUpdate(start: number, end: number) {
    try {
      startDetailSpider(start, end, () => {
        console.log("Update Finish!");
        process.exit(0);
      });
    } catch (error) {
      console.log("startDyjySpider>>" + JSON.stringify(error));
      process.exit(0);
    }
  }

}

