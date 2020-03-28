"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const homeSpider_1 = require("./home/homeSpider");
const detailSpider_1 = require("./detail/detailSpider");
const LogUtils_1 = require("../utils/LogUtils");
class DyjySpider {
    start(total, range) {
        try {
            homeSpider_1.getMaxLength((length) => {
                LogUtils_1.log("total is " + length);
                let end = 1;
                if (!total) {
                    end = length - range;
                }
                homeSpider_1.startHomeSpider(() => {
                    detailSpider_1.startDetailSpider(length, end, () => {
                        LogUtils_1.log("Update Finish!", true);
                        process.exit(0);
                    });
                });
            });
        }
        catch (error) {
            LogUtils_1.log("startDyjySpider>>" + JSON.stringify(error));
            process.exit(0);
        }
    }
    updateAllMovies() {
        try {
            let end = 25000;
            detailSpider_1.startDetailSpider(20000, 15000, () => {
                LogUtils_1.log("Update Finish!", true);
                process.exit(0);
            });
        }
        catch (error) {
            LogUtils_1.log("startDyjySpider>>" + JSON.stringify(error));
            process.exit(0);
        }
    }
    partUpdate(start, end) {
        try {
            detailSpider_1.startDetailSpider(start, end, () => {
                LogUtils_1.log("Update Finish!", true);
                process.exit(0);
            });
        }
        catch (error) {
            LogUtils_1.log("startDyjySpider>>" + JSON.stringify(error));
            process.exit(0);
        }
    }
}
exports.default = DyjySpider;
