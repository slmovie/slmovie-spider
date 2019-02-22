import { getTimeFormat } from "./DateFormat";

export const log = (log: String, time: boolean = false) => {
  if (time) {
    console.log(getTimeFormat(Date.now()) + " " + log);
  } else {
    console.log(log);
  }
};