"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by 包俊 on 2017/7/9.
 */
const node_schedule_1 = __importDefault(require("node-schedule"));
const dyjySpider_1 = require("./dyjy/dyjySpider");
const doubanSpider_1 = __importDefault(require("./douban/doubanSpider"));
const rule = new node_schedule_1.default.RecurrenceRule();
rule.dayOfWeek = [3, 0];
rule.hour = 4;
rule.minute = 0;
const doubanRule = new node_schedule_1.default.RecurrenceRule();
rule.dayOfWeek = [1, 5];
rule.hour = 4;
rule.minute = 0;
console.log("schedule running");
node_schedule_1.default.scheduleJob(rule, function () {
    console.log("start update");
    dyjySpider_1.startDyjySpider(false);
});
node_schedule_1.default.scheduleJob(doubanRule, () => {
    const douban = new doubanSpider_1.default();
    douban.start(false);
});
