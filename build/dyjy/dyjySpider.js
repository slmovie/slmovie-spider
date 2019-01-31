"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const homeSpider_1 = require("./home/homeSpider");
const detailSpider_1 = require("./detail/detailSpider");
class DyjySpider {
    start(total, range) {
        try {
            homeSpider_1.getMaxLength((length) => {
                console.log("total is " + length);
                let end = 1;
                if (!total) {
                    end = length - range;
                }
                homeSpider_1.startHomeSpider(() => {
                    detailSpider_1.startDetailSpider(length, end, () => {
                        console.log("Update Finish!");
                        process.exit(0);
                    });
                });
            });
        }
        catch (error) {
            console.log("startDyjySpider>>" + JSON.stringify(error));
            process.exit(0);
        }
    }
    partUpdate(start, end) {
        try {
            detailSpider_1.startDetailSpider(start, end, () => {
                console.log("Update Finish!");
                process.exit(0);
            });
        }
        catch (error) {
            console.log("startDyjySpider>>" + JSON.stringify(error));
            process.exit(0);
        }
    }
}
exports.default = DyjySpider;
