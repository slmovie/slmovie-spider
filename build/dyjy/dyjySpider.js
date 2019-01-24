"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const homeSpider_1 = require("./home/homeSpider");
const detailSpider_1 = require("./detail/detailSpider");
exports.startDyjySpider = (total) => {
    try {
        homeSpider_1.getMaxLength((length) => {
            console.log("total is " + length);
            let start = length - 2000;
            if (total) {
                start = 0;
            }
            detailSpider_1.startDetailSpider(start, length, () => {
                homeSpider_1.startHomeSpider(() => {
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
};
