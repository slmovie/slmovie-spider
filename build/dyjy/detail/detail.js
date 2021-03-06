"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const detailResponse_1 = require("../../typings/detailResponse");
const XunLeiTransfer_1 = require("../../utils/XunLeiTransfer");
const cheerio_1 = __importDefault(require("cheerio"));
const request_1 = __importDefault(require("request"));
const iconv_lite_1 = __importDefault(require("iconv-lite"));
const pptrInstance_1 = require("../../utils/pptrInstance");
class DetailSpider {
    getDatail(address, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            // const myProxy = new MyProxy();
            // const proxy = await myProxy.getProxy();
            // console.log("Check " + proxy + ">>" + address);
            this.reqHtmlPuppeteer(address, (result) => {
                // console.log("Address>>" + address + "====Proxy>>" + proxy);
                // myProxy.hasProxy(true);
                callback(result);
            }, (error) => {
                // myProxy.hasProxy(false);
                // console.log(error);
                this.getDatail(address, callback);
            });
        });
    }
    reqHtml(address, proxy, resolve, reject) {
        const myReq = request_1.default.defaults({
            proxy: proxy
        });
        myReq.get("http://www.idyjy.com/sub/" + address + ".html", { encoding: "binary", timeout: 3000 }, (error, response, res) => {
            if (error) {
                reject(error);
            }
            else {
                if (response.statusCode === 200) {
                    const body = iconv_lite_1.default.decode(Buffer.from(res, "binary"), "gbk");
                    if (body.indexOf("如果您的浏览器没有自动跳转，请点击这里") !== -1) {
                        resolve();
                    }
                    else {
                        const result = this.handleData(body, address);
                        if (!result.name && !result.post) {
                            reject("getDatail>>>" + address + "Not name and post");
                        }
                        else {
                            resolve(result);
                        }
                    }
                }
                else {
                    reject(response.statusCode);
                }
            }
        });
    }
    reqHtmlPuppeteer(address, resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const browser = yield pptrInstance_1.getBrowser();
                const page = yield browser.newPage();
                yield page
                    .goto("http://www.idyjy.com/sub/" + address + ".html", {
                    waitUntil: "load",
                    timeout: 5000
                })
                    .catch(error => {
                    console.log(error);
                });
                const html = yield page.content();
                if (html.indexOf("如果您的浏览器没有自动跳转，请点击这里") !== -1) {
                    resolve();
                }
                else {
                    const result = this.handleData(html, address);
                    if (!result.name && !result.post) {
                        reject("getDatail>>>" + address + "Not name and post");
                    }
                    else {
                        resolve(result);
                    }
                }
                yield page.close();
            }
            catch (error) {
                reject();
            }
        });
    }
    handleData(html, address) {
        let $ = cheerio_1.default.load(html);
        const name = $("span", ".h1title").text();
        const detail = [];
        detail.push(" 片名： " + name);
        $("li", ".info").each(function (i, elem) {
            detail.push($(elem).text());
        });
        const detailData = this.handleDetails(detail);
        var average = $("#MARK_B2").attr("value");
        if (!average) {
            average = "";
        }
        detailData.average = average;
        const details = {
            id: address,
            detail: detail,
            name: name,
            post: $("img", ".pic").attr("src"),
            describe: $(".endtext").text(),
            details: detailData,
            files: this.handleDownloads($),
            doubanID: ""
        };
        return details;
    }
    handleDetails(detail) {
        const details = new detailResponse_1.MovieInfo();
        for (let i = 0; i < detail.length; i++) {
            if (detail[i].indexOf("片名") !== -1) {
                let name = detail[i];
                name = name.replace(/\s+/g, "");
                details.name = name.slice(3);
            }
            else if (detail[i].indexOf("上映年代") !== -1) {
                let str = detail[i];
                str = str.replace(/\s+/g, "");
                details.year = str.slice(5, 9);
                details.location = str.slice(12);
            }
            else if (detail[i].indexOf("类型") !== -1) {
                let type = detail[i].slice(3);
                type = type.replace(/^\s*/, "");
                type = type.replace(/(\s*$)/g, "");
                details.type = type.replace(/\s+/g, "、");
            }
            else if (detail[i].indexOf("导演") !== -1) {
                let director = detail[i].slice(3);
                director = director.replace(/^\s*/, "");
                director = director.replace(/(\s*$)/g, "");
                details.director = director.replace(/\s+/g, " ");
            }
            else if (detail[i].indexOf("主演") !== -1) {
                let actor = detail[i].slice(3);
                actor = actor.replace(/^\s*/, "");
                actor = actor.replace(/(\s*$)/g, "");
                details.actor = actor.replace(/\s+/g, " ");
            }
            else if (detail[i].indexOf("又名") !== -1) {
                let otherName = detail[i].slice(3);
                details.otherName = otherName.replace(/\s+/g, "");
            }
            else if (detail[i].indexOf("IMDB") !== -1) {
                let IMDB = detail[i].slice(5);
                details.IMDB = IMDB.replace(/\s+/g, "");
            }
            else if (detail[i].indexOf("更新状态") !== -1 ||
                detail[i].indexOf("更新至") !== -1) {
                details.status = detail[i].replace(/\s+/g, "");
                details.TV = true;
            }
        }
        return details;
    }
    handleDownloads($) {
        const downloads = Array();
        $(".down_part_name").each((i, elem) => __awaiter(this, void 0, void 0, function* () {
            const name = $("a", elem).text();
            const fileSize = $("em", $(elem)
                .parent()
                .next()).text();
            const download = $(elem).parent().prev().attr("value");
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
            // }
            if (download) {
                downloads.push({
                    name: name,
                    fileSize: fileSize,
                    download: XunLeiTransfer_1.transfer(download)
                });
            }
        }));
        return downloads;
    }
}
exports.default = DetailSpider;
