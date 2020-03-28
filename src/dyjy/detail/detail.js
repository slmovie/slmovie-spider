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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var detailResponse_1 = require("../../typings/detailResponse");
var XunLeiTransfer_1 = require("../../utils/XunLeiTransfer");
var cheerio_1 = require("cheerio");
var request_1 = require("request");
var iconv_lite_1 = require("iconv-lite");
var pptrInstance_1 = require("../../utils/pptrInstance");
var DetailSpider = /** @class */ (function () {
    function DetailSpider() {
    }
    DetailSpider.prototype.getDatail = function (address, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // const myProxy = new MyProxy();
                // const proxy = await myProxy.getProxy();
                // console.log("Check " + proxy + ">>" + address);
                this.reqHtmlPuppeteer(address, function (result) {
                    // console.log("Address>>" + address + "====Proxy>>" + proxy);
                    // myProxy.hasProxy(true);
                    callback(result);
                }, function (error) {
                    // myProxy.hasProxy(false);
                    // console.log(error);
                    _this.getDatail(address, callback);
                });
                return [2 /*return*/];
            });
        });
    };
    DetailSpider.prototype.reqHtml = function (address, proxy, resolve, reject) {
        var _this = this;
        var myReq = request_1["default"].defaults({
            proxy: proxy
        });
        myReq.get("http://www.idyjy.com/sub/" + address + ".html", { encoding: "binary", timeout: 3000 }, function (error, response, res) {
            if (error) {
                reject(error);
            }
            else {
                if (response.statusCode === 200) {
                    var body = iconv_lite_1["default"].decode(Buffer.from(res, "binary"), "gbk");
                    if (body.indexOf("如果您的浏览器没有自动跳转，请点击这里") !== -1) {
                        resolve();
                    }
                    else {
                        var result = _this.handleData(body, address);
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
    };
    DetailSpider.prototype.reqHtmlPuppeteer = function (address, resolve, reject) {
        return __awaiter(this, void 0, void 0, function () {
            var browser, page, html, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, pptrInstance_1.getBrowser()];
                    case 1:
                        browser = _a.sent();
                        return [4 /*yield*/, browser.newPage()];
                    case 2:
                        page = _a.sent();
                        return [4 /*yield*/, page
                                .goto("http://www.idyjy.com/sub/" + address + ".html", {
                                waitUntil: "load",
                                timeout: 5000
                            })["catch"](function (error) {
                                console.log(error);
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, page.content()];
                    case 4:
                        html = _a.sent();
                        if (html.indexOf("如果您的浏览器没有自动跳转，请点击这里") !== -1) {
                            resolve();
                        }
                        else {
                            result = this.handleData(html, address);
                            if (!result.name && !result.post) {
                                reject("getDatail>>>" + address + "Not name and post");
                            }
                            else {
                                resolve(result);
                            }
                        }
                        return [4 /*yield*/, page.close()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        reject();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    DetailSpider.prototype.handleData = function (html, address) {
        var $ = cheerio_1["default"].load(html);
        var name = $("span", ".h1title").text();
        var detail = [];
        detail.push(" 片名： " + name);
        $("li", ".info").each(function (i, elem) {
            detail.push($(elem).text());
        });
        var detailData = this.handleDetails(detail);
        var average = $("#MARK_B2").attr("value");
        if (!average) {
            average = "";
        }
        detailData.average = average;
        var details = {
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
    };
    DetailSpider.prototype.handleDetails = function (detail) {
        var details = new detailResponse_1.MovieInfo();
        for (var i = 0; i < detail.length; i++) {
            if (detail[i].indexOf("片名") !== -1) {
                var name_1 = detail[i];
                name_1 = name_1.replace(/\s+/g, "");
                details.name = name_1.slice(3);
            }
            else if (detail[i].indexOf("上映年代") !== -1) {
                var str = detail[i];
                str = str.replace(/\s+/g, "");
                details.year = str.slice(5, 9);
                details.location = str.slice(12);
            }
            else if (detail[i].indexOf("类型") !== -1) {
                var type = detail[i].slice(3);
                type = type.replace(/^\s*/, "");
                type = type.replace(/(\s*$)/g, "");
                details.type = type.replace(/\s+/g, "、");
            }
            else if (detail[i].indexOf("导演") !== -1) {
                var director = detail[i].slice(3);
                director = director.replace(/^\s*/, "");
                director = director.replace(/(\s*$)/g, "");
                details.director = director.replace(/\s+/g, " ");
            }
            else if (detail[i].indexOf("主演") !== -1) {
                var actor = detail[i].slice(3);
                actor = actor.replace(/^\s*/, "");
                actor = actor.replace(/(\s*$)/g, "");
                details.actor = actor.replace(/\s+/g, " ");
            }
            else if (detail[i].indexOf("又名") !== -1) {
                var otherName = detail[i].slice(3);
                details.otherName = otherName.replace(/\s+/g, "");
            }
            else if (detail[i].indexOf("IMDB") !== -1) {
                var IMDB = detail[i].slice(5);
                details.IMDB = IMDB.replace(/\s+/g, "");
            }
            else if (detail[i].indexOf("更新状态") !== -1 ||
                detail[i].indexOf("更新至") !== -1) {
                details.status = detail[i].replace(/\s+/g, "");
                details.TV = true;
            }
        }
        return details;
    };
    DetailSpider.prototype.handleDownloads = function ($) {
        var _this = this;
        var downloads = Array();
        $(".down_part_name").each(function (i, elem) { return __awaiter(_this, void 0, void 0, function () {
            var name, fileSize, download;
            return __generator(this, function (_a) {
                name = $("a", elem).text();
                fileSize = $("em", $(elem)
                    .parent()
                    .next()).text();
                download = $(elem).parent().prev().attr("value");
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
                return [2 /*return*/];
            });
        }); });
        return downloads;
    };
    return DetailSpider;
}());
exports["default"] = DetailSpider;
