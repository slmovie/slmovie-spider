"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const homeSpider_1 = require("./home/homeSpider");
const detailSpider_1 = require("./detail/detailSpider");
exports.startDyjySpider = (total) => {
    try {
        homeSpider_1.getMaxLength((length) => {
            console.log("total is " + length);
            let end = 1;
            if (!total) {
                end = length - 1500;
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
};
