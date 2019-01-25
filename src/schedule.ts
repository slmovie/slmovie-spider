/**
 * Created by 包俊 on 2017/7/9.
 */
import schedule from "node-schedule";
import { startDyjySpider } from "./dyjy/dyjySpider";
import DoubanSpider from "./douban/doubanSpider";

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [3, 0];
rule.hour = 4;
rule.minute = 0;

const doubanRule = new schedule.RecurrenceRule();
rule.dayOfWeek = [1, 5];
rule.hour = 4;
rule.minute = 0;

console.log("schedule running");

schedule.scheduleJob(rule, function () {
  console.log("start update");
  startDyjySpider(false);
});

schedule.scheduleJob(doubanRule, () => {
  const douban = new DoubanSpider();
  douban.start(false);
});