import { startHomeSpider, getMaxLength } from "./home/homeSpider";
import { startDetailSpider } from "./detail/detailSpider";
import { log } from "../utils/LogUtils";

export default class DyjySpider {
  public start(total: boolean, range: number) {
    try {
      getMaxLength((length: number) => {
        log("total is " + length);
        let end = 1;
        if (!total) {
          end = length - range;
        }
        startHomeSpider(() => {
          startDetailSpider(length, end, () => {
            log("Update Finish!", true);
            process.exit(0);
          });
        });
      });
    } catch (error) {
      log("startDyjySpider>>" + JSON.stringify(error));
      process.exit(0);
    }
  }

  public updateAllMovies() {
    try {
      let end = 1;
      startDetailSpider(29076, end, () => {
        log("Update Finish!", true);
        process.exit(0);
      });
    } catch (error) {
      log("startDyjySpider>>" + JSON.stringify(error));
      process.exit(0);
    }
  }

  public partUpdate(start: number, end: number) {
    try {
      startDetailSpider(start, end, () => {
        log("Update Finish!", true);
        process.exit(0);
      });
    } catch (error) {
      log("startDyjySpider>>" + JSON.stringify(error));
      process.exit(0);
    }
  }
}
