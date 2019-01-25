import { startDyjySpider } from "./dyjy/dyjySpider";
import { startDetailSpider } from "./dyjy/detail/detailSpider";

// startDyjySpider(true);
try {
  startDetailSpider(26121, 0, () => {
    console.log("Update Finish!");
    process.exit(0);
  });
} catch (error) {
  console.log("startDyjySpider>>" + JSON.stringify(error));
  process.exit(0);
}