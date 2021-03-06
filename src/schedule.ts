/**
 * Created by 包俊 on 2017/7/9.
 */
import schedule from "node-schedule";
import DyjySpider from "./dyjy/dyjySpider";
// import DoubanSpider from "./douban/doubanSpider";
import { log } from "./utils/LogUtils";

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [3, 5, 0];
rule.hour = 4;
rule.minute = 0;

const importUpdateRule = new schedule.RecurrenceRule();
importUpdateRule.dayOfWeek = [4];
importUpdateRule.hour = 4;
importUpdateRule.minute = 0;

// const doubanRule = new schedule.RecurrenceRule();
// doubanRule.dayOfWeek = [6];
// doubanRule.hour = 4;
// doubanRule.minute = 0;

log("schedule running", true);

schedule.scheduleJob(rule, function() {
  log("start common update");
  const dyjy = new DyjySpider();
  dyjy.start(false, 500);
});

schedule.scheduleJob(importUpdateRule, function() {
  log("start douban update", true);
  const dyjy = new DyjySpider();
  dyjy.start(false, 2000);
});

// schedule.scheduleJob(doubanRule, () => {
//   log("start huge update", true);
//   const douban = new DoubanSpider();
//   douban.start(false);
// });
