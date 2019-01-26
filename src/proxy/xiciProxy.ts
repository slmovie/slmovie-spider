/**
 * Created by 包俊 on 2018/5/15.
 */
import cheerio from "cheerio";
import request from "request";
import { Proxy } from "../typings/proxy";

export const getXiciPoxy = async (): Promise<string[]> => {
  const proxys: string[] = [];
  let res = await reqHtml();
  if (res !== "0") {
    let $ = cheerio.load(res);
    let tr = $("tr");
    for (let line = 1; line < tr.length; line++) {
      let td = $(tr[line]).children("td");
      const proxy = new Proxy(String(td[5].children[0].data).toLowerCase() + "://" + td[1].children[0].data, td[2].children[0].data);
      proxys.push(proxy.getProxy());
    }
  }
  return new Promise(resolve => {
    resolve(proxys);
  });
};

const address = ["https://www.xicidaili.com/nn/", "https://www.xicidaili.com/nt/",
  "https://www.xicidaili.com/wt/"];

const reqHtml = (): Promise<string> => {
  const target = parseInt(String(Math.random() * 3), 10);
  const page = parseInt(String(Math.random() * 2), 10) + 1;
  return new Promise((resolve) => {
    console.log("target>>>" + target);
    console.log("url>>>" + address[target] + page);
    request.get(address[target], (error, response, body) => {
      if (error || response.statusCode !== 200) {
        resolve("0");
      } else {
        resolve(body);
      }
    });
  });
};