"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by 包俊 on 2017/7/9.
 */
const node_schedule_1 = __importDefault(require("node-schedule"));
const dyjySpider_1 = __importDefault(require("./dyjy/dyjySpider"));
const doubanSpider_1 = __importDefault(require("./douban/doubanSpider"));
const LogUtils_1 = require("./utils/LogUtils");
const rule = new node_schedule_1.default.RecurrenceRule();
rule.dayOfWeek = [3, 5, 0];
rule.hour = 4;
rule.minute = 0;
const importUpdateRule = new node_schedule_1.default.RecurrenceRule();
importUpdateRule.dayOfWeek = [4];
importUpdateRule.hour = 4;
importUpdateRule.minute = 0;
const doubanRule = new node_schedule_1.default.RecurrenceRule();
doubanRule.dayOfWeek = [6];
doubanRule.hour = 4;
doubanRule.minute = 0;
LogUtils_1.log("schedule running", true);
node_schedule_1.default.scheduleJob(rule, function () {
    LogUtils_1.log("start common update");
    const dyjy = new dyjySpider_1.default();
    dyjy.start(false, 500);
});
node_schedule_1.default.scheduleJob(importUpdateRule, function () {
    LogUtils_1.log("start douban update", true);
    const dyjy = new dyjySpider_1.default();
    dyjy.start(false, 2000);
});
node_schedule_1.default.scheduleJob(doubanRule, () => {
    LogUtils_1.log("start huge update", true);
    const douban = new doubanSpider_1.default();
    douban.start(false);
});
