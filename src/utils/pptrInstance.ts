import puppeteer, { Browser } from "puppeteer";

let instance: Browser;
export const getBrowser = async () => {
  if (!instance)
    instance = await puppeteer.launch({
      args: ["--no-sandbox"]
    });
  return instance;
};
