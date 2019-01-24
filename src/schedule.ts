/**
 * Created by 包俊 on 2017/7/9.
 */
import schedule from "node-schedule";
import { startDyjySpider } from "./dyjy/dyjySpider";

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(5, 6)];
rule.hour = 4;
rule.minute = 0;

console.log("schedule running");

schedule.scheduleJob(rule, function () {
  console.log("start update");
  startDyjySpider(false);
});