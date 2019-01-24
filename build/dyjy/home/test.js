"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const homeSpider_1 = require("./homeSpider");
homeSpider_1.getMaxLength((length) => {
    console.log(length);
});
homeSpider_1.startHomeSpider(() => {
    console.log("All finish");
});
