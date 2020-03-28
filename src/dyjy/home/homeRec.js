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
var homeResponse_1 = require("../../typings/homeResponse");
var cheerio_1 = require("cheerio");
var request_1 = require("request");
var iconv_lite_1 = require("iconv-lite");
var pptrInstance_1 = require("../../utils/pptrInstance");
var HomeRec = /** @class */ (function () {
    function HomeRec() {
        var _this = this;
        this.getHotMovie = function (html) {
            var $ = cheerio_1["default"].load(html);
            var movies = [];
            $(".play-img", ".moxhotcoment").each(function (i, elem) {
                var movie = _this.getMovie($, elem);
                movies.push(movie);
            });
            return movies;
        };
        this.getNewMovies = function (html) {
            var $ = cheerio_1["default"].load(html);
            var result = [];
            var _loop_1 = function (i) {
                var typeMovies = new homeResponse_1.MoviesListItemBean();
                var movies = [];
                $(".play-img", $(".img-list", $(".box")[0])[i]).each(function (i, elem) {
                    var movie = _this.getMovie($, elem);
                    movies.push(movie);
                });
                typeMovies.index = i;
                typeMovies.movies = movies;
                typeMovies.type = _this.newMoviesType(i);
                result.push(typeMovies);
            };
            for (var i = 0; i < 8; i++) {
                _loop_1(i);
            }
            return result;
        };
        this.getNewTVs = function (html) {
            var $ = cheerio_1["default"].load(html);
            var result = [];
            var _loop_2 = function (i) {
                var typeMovies = new homeResponse_1.MoviesListItemBean();
                var movies = [];
                $(".play-img", $(".img-list", $(".box")[1])[i]).each(function (i, elem) {
                    var movie = _this.getMovie($, elem);
                    movies.push(movie);
                });
                typeMovies.index = i;
                typeMovies.movies = movies;
                typeMovies.type = _this.newTVsType(i);
                result.push(typeMovies);
            };
            for (var i = 0; i < 5; i++) {
                _loop_2(i);
            }
            return result;
        };
        this.getMovie = function ($, elem) {
            var address = _this.getMovidId($, elem);
            if (!address) {
                address = "";
            }
            var name = $(elem).attr("title");
            if (!name) {
                name = "";
            }
            var post = $("img", elem).attr("original");
            if (!post) {
                post = "";
            }
            return {
                name: name,
                //网页地址
                address: address,
                //海报图片
                post: post,
                //豆瓣评分
                douban: $("info", $(".pRightBottom", elem)).text(),
                //上映日期
                year: $("info", $(".pLeftTop", elem)[0]).text(),
                from: "dyjy"
            };
        };
        this.getMovidId = function ($, elem) {
            var address = $(elem).attr("href");
            if (address) {
                var split = address.split("/");
                address = split[split.length - 1].split(".")[0];
            }
            return address;
        };
        this.newTVsType = function (index) {
            if (index === 1) {
                return "国产剧";
            }
            else if (index === 2) {
                return "港台剧";
            }
            else if (index === 3) {
                return "欧美剧";
            }
            else if (index === 4) {
                return "日韩剧";
            }
            else {
                return "最近更新";
            }
        };
        this.newMoviesType = function (index) {
            if (index === 1) {
                return "动作片";
            }
            else if (index === 2) {
                return "喜剧片";
            }
            else if (index === 3) {
                return "爱情片";
            }
            else if (index === 4) {
                return "科幻片";
            }
            else if (index === 5) {
                return "恐怖片";
            }
            else if (index === 6) {
                return "剧情片";
            }
            else if (index === 7) {
                return "战争片";
            }
            else {
                return "最近更新";
            }
        };
    }
    HomeRec.prototype.getRec = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.reqHtmlPuppeteer(function (result) {
                    callback(result);
                }, function (error) {
                    console.error(error);
                    _this.getRec(callback);
                });
                return [2 /*return*/];
            });
        });
    };
    HomeRec.prototype.reqHtml = function (proxy, resolve, reject) {
        var _this = this;
        var myReq = request_1["default"].defaults({
            proxy: proxy
        });
        myReq.get("http://www.idyjy.com", { encoding: "binary", timeout: 1000 }, function (error, response, res) {
            if (error) {
                reject(error);
            }
            else {
                if (response.statusCode === 200) {
                    var body = iconv_lite_1["default"].decode(Buffer.from(res, "binary"), "gbk");
                    var result = new homeResponse_1.HomeRecBean();
                    result.data.hotMovies = _this.getHotMovie(body);
                    result.data.newTVs = _this.getNewTVs(body);
                    result.data.newMovies = _this.getNewMovies(body);
                    if (result.data.hotMovies.length !== 0 &&
                        result.data.newTVs.length !== 0 &&
                        result.data.newMovies.length !== 0) {
                        resolve(result);
                    }
                    else {
                        reject("Error");
                    }
                }
                else {
                    reject(response.statusCode);
                }
            }
        });
    };
    HomeRec.prototype.reqHtmlPuppeteer = function (resolve, reject) {
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
                        return [4 /*yield*/, page.goto("http://www.idyjy.com")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, page.content()];
                    case 4:
                        html = _a.sent();
                        result = new homeResponse_1.HomeRecBean();
                        result.data.hotMovies = this.getHotMovie(html);
                        result.data.newTVs = this.getNewTVs(html);
                        result.data.newMovies = this.getNewMovies(html);
                        if (result.data.hotMovies.length !== 0 &&
                            result.data.newTVs.length !== 0 &&
                            result.data.newMovies.length !== 0) {
                            resolve(result);
                        }
                        else {
                            reject("Error");
                        }
                        return [4 /*yield*/, page.close()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        reject(error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return HomeRec;
}());
exports["default"] = HomeRec;
