/**
 * Created by 包俊 on 2018/5/15.
 */
import cheerio from "cheerio";
import https from "https";
import { Proxy } from "../typings/proxy";

export const getKuaiPoxy = async (): Promise<string[]> => {
  const page = parseInt(String(Math.random() * 10), 10) + 1;
  let res = await reqHtml(String(page));
  let $ = cheerio.load(res);
  let tr = $("tr");
  const proxys: string[] = [];
  for (let line = 1; line < tr.length; line++) {
    let td = $(tr[line]).children("td");
    const proxy = new Proxy("http://" + td[0].children[0].data, td[1].children[0].data);
    proxys.push(proxy.getProxy());
  }
  return new Promise(resolve => {
    resolve(proxys);
  });
};

const reqHtml = (page: string): Promise<string> => {
  return new Promise((resolve) => {
    console.log("url>>>https://ip.seofangfa.com/proxy/" + page + ".html");
    let req = https.get("https://ip.seofangfa.com/proxy/" + page + ".html", function (res: any) {
      let html = "";
      res.on("data", function (data: any) {
        html += data;
      });
      res.on("end", function () {
        resolve(html);
      });
    });
    req.on("error", () => {
      resolve("0");
    });
    req.end();
  });
};