/**
 * Created by 包俊 on 2017/7/9.
 */
import schedule from "node-schedule";
import DyjySpider from "./dyjy/dyjySpider";
import DoubanSpider from "./douban/doubanSpider";

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [1, 3, 5, 0];
rule.hour = 4;
rule.minute = 0;

const importUpdateRule = new schedule.RecurrenceRule();
rule.dayOfWeek = [4];
rule.hour = 4;
rule.minute = 0;

const doubanRule = new schedule.RecurrenceRule();
rule.dayOfWeek = [2, 6];
rule.hour = 4;
rule.minute = 0;

console.log("schedule running");

schedule.scheduleJob(rule, function () {
  console.log("start update");
  const dyjy = new DyjySpider();
  dyjy.start(false, 500);
});

schedule.scheduleJob(importUpdateRule, function () {
  console.log("start update");
  const dyjy = new DyjySpider();
  dyjy.start(false, 2000);
});

schedule.scheduleJob(doubanRule, () => {
  const douban = new DoubanSpider();
  douban.start(false);
});