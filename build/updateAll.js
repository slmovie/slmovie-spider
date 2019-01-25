"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const detailSpider_1 = require("./dyjy/detail/detailSpider");
// startDyjySpider(true);
try {
    detailSpider_1.startDetailSpider(26121, 0, () => {
        console.log("Update Finish!");
        process.exit(0);
    });
}
catch (error) {
    console.log("startDyjySpider>>" + JSON.stringify(error));
    process.exit(0);
}
