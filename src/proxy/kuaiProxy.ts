/**
 * Created by 包俊 on 2018/5/15.
 */
import cheerio from "cheerio";
import request from "request";
import { Proxy } from "../typings/proxy";

export const getKuaiPoxy = async (): Promise<string[]> => {
  const page = parseInt(String(Math.random() * 10), 10) + 1;
  const proxys: string[] = [];
  let res = await reqHtml(String(page));
  if (res !== "0") {
    let $ = cheerio.load(res);
    let tr = $("tr");
    for (let line = 1; line < tr.length; line++) {
      let td = $(tr[line]).children("td");
      const proxy = new Proxy("http://" + td[0].children[0].data, td[1].children[0].data);
      proxys.push(proxy.getProxy());
    }
  }
  return new Promise(resolve => {
    resolve(proxys);
  });
};

const reqHtml = (page: string): Promise<string> => {
  return new Promise((resolve) => {
    console.log("url>>>https://ip.seofangfa.com/proxy/" + page + ".html");
    request.get("https://ip.seofangfa.com/proxy/" + page + ".html", { timeout: 1500 }, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        resolve("0");
      } else {
        resolve(body);
      }
    });
  });
};