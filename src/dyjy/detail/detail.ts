import { IDownloadFiles, IMovieInfo, MovieInfo, IDetails } from "../../typings/detailResponse";
import { transfer } from "../../utils/XunLeiTransfer";
import cheerio from "cheerio";
import MyProxy from "../../proxy/proxy";
import request from "request";
import iconv from "iconv-lite";

export default class DetailSpider {
  async getDatail(address: string, callback: any) {
    const myProxy = new MyProxy();
    const proxy = await myProxy.getProxy();
    this.reqHtml(address, proxy, (result: IDetails) => {
      console.log("Address>>" + address + "====Proxy>>" + proxy);
      myProxy.hasProxy(true);
      callback(result);
    }, (error: any) => {
      myProxy.hasProxy(false);
      this.getDatail(address, callback);
    });
  }

  private reqHtml(address: string, proxy: string, resolve: any, reject: any) {
    const myReq = request.defaults({ "proxy": proxy });
    myReq.get("http://www.idyjy.com/sub/" + address + ".html",
      { encoding: "binary", timeout: 1000 },
      (error, response, res) => {
        if (error) {
          reject(error);
        } else {
          if (response.statusCode === 200) {
            const body = iconv.decode(Buffer.from(res, "binary"), "gbk");
            if (body.indexOf("如果您的浏览器没有自动跳转，请点击这里") !== -1) {
              resolve();
            } else {
              const result = this.handleData(body, address);
              if (!result.name && !result.post) {
                reject("getDatail>>>" + address + "Not name and post");
              } else {
                resolve(result);
              }
            }
          } else {
            reject(response.statusCode);
          }
        }
      });
  }

  private handleData(html: string, address: string) {
    let $ = cheerio.load(html);
    const name = $("span", ".h1title").text();
    const detail = [];
    detail.push(" 片名： " + name);
    $("li", ".info").each(function (i, elem) {
      detail.push($(elem).text());
    });
    const details: IDetails = {
      id: address,
      detail: detail,
      name: name,
      post: $("img", ".pic").attr("src"),
      describe: $(".endtext").text(),
      details: this.handleDetails(detail),
      files: this.handleDownloads($),
    };
    return details;
  }

  private handleDetails(detail: string[]): IMovieInfo {
    const details = new MovieInfo();
    for (let i = 0; i < detail.length; i++) {
      if (detail[i].indexOf("片名") !== -1) {
        let name = detail[i];
        name = name.replace(/\s+/g, "");
        details.name = name.slice(3);
      } else if (detail[i].indexOf("上映年代") !== -1) {
        let str = detail[i];
        str = str.replace(/\s+/g, "");
        details.year = str.slice(5, 9);
        details.location = str.slice(12);
      } else if (detail[i].indexOf("类型") !== -1) {
        let type = detail[i].slice(3);
        type = type.replace(/^\s*/, "");
        type = type.replace(/(\s*$)/g, "");
        details.type = type.replace(/\s+/g, "、");
      } else if (detail[i].indexOf("导演") !== -1) {
        let director = detail[i].slice(3);
        director = director.replace(/^\s*/, "");
        director = director.replace(/(\s*$)/g, "");
        details.director = director.replace(/\s+/g, " ");
      } else if (detail[i].indexOf("主演") !== -1) {
        let actor = detail[i].slice(3);
        actor = actor.replace(/^\s*/, "");
        actor = actor.replace(/(\s*$)/g, "");
        details.actor = actor.replace(/\s+/g, " ");
      } else if (detail[i].indexOf("又名") !== -1) {
        let otherName = detail[i].slice(3);
        details.otherName = otherName.replace(/\s+/g, "");
      } else if (detail[i].indexOf("IMDB") !== -1) {
        let IMDB = detail[i].slice(5);
        details.IMDB = IMDB.replace(/\s+/g, "");
      } else if (detail[i].indexOf("更新状态") !== -1 || detail[i].indexOf("更新至") !== -1) {
        details.status = detail[i].replace(/\s+/g, "");
        details.TV = true;
      }
    }
    return details;
  }

  private handleDownloads($: CheerioStatic) {
    const downloads: IDownloadFiles[] = Array<IDownloadFiles>();
    $(".down_part_name").each(async (i, elem) => {
      const name = $("a", elem).text();
      const fileSize = $("em", $(elem).parent().next()).text();
      const url = $(elem).parent().prev().attr("value");
      let download = "";
      // if (url.indexOf(".html") !== -1) {
      //   try {
      //     const response = await getDownloadUrl("");
      //     if (response.statusCode === 200) {
      //       const che = cheerio.load(response.text);
      //       download = che("a", che(".downtools")).attr("href");
      //     }
      //   } catch (error) {
      //   }
      // } else {
      download = url;
      // }
      if (download) {
        downloads.push({
          name: name,
          fileSize: fileSize,
          download: transfer(download),
        });
      }
    });
    return downloads;
  }
}
