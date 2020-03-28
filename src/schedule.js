"use strict";
exports.__esModule = true;
/**
 * Created by 包俊 on 2017/7/9.
 */
var node_schedule_1 = require("node-schedule");
var dyjySpider_1 = require("./dyjy/dyjySpider");
// import DoubanSpider from "./douban/doubanSpider";
var LogUtils_1 = require("./utils/LogUtils");
var rule = new node_schedule_1["default"].RecurrenceRule();
rule.dayOfWeek = [3, 5, 0];
rule.hour = 4;
rule.minute = 0;
var importUpdateRule = new node_schedule_1["default"].RecurrenceRule();
importUpdateRule.dayOfWeek = [4];
importUpdateRule.hour = 4;
importUpdateRule.minute = 0;
// const doubanRule = new schedule.RecurrenceRule();
// doubanRule.dayOfWeek = [6];
// doubanRule.hour = 4;
// doubanRule.minute = 0;
LogUtils_1.log("schedule running", true);
node_schedule_1["default"].scheduleJob(rule, function () {
    LogUtils_1.log("start common update");
    var dyjy = new dyjySpider_1["default"]();
    dyjy.start(false, 500);
});
node_schedule_1["default"].scheduleJob(importUpdateRule, function () {
    LogUtils_1.log("start douban update", true);
    var dyjy = new dyjySpider_1["default"]();
    dyjy.start(false, 2000);
});
// schedule.scheduleJob(doubanRule, () => {
//   log("start huge update", true);
//   const douban = new DoubanSpider();
//   douban.start(false);
// });
