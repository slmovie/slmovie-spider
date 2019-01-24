"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homeResponse_1 = require("../../typings/homeResponse");
const cheerio_1 = __importDefault(require("cheerio"));
const proxy_1 = __importDefault(require("../../proxy/proxy"));
const request_1 = __importDefault(require("request"));
const iconv_lite_1 = __importDefault(require("iconv-lite"));
class HomeRec {
    constructor() {
        this.getHotMovie = (html) => {
            let $ = cheerio_1.default.load(html);
            let movies = [];
            $(".play-img", ".moxhotcoment").each((i, elem) => {
                let movie = this.getMovie($, elem);
                movies.push(movie);
            });
            return movies;
        };
        this.getNewMovies = (html) => {
            let $ = cheerio_1.default.load(html);
            let result = [];
            for (let i = 0; i < 8; i++) {
                let typeMovies = new homeResponse_1.MoviesListItemBean();
                let movies = [];
                $(".play-img", $(".img-list", $(".box")[0])[i]).each((i, elem) => {
                    let movie = this.getMovie($, elem);
                    movies.push(movie);
                });
                typeMovies.index = i;
                typeMovies.movies = movies;
                typeMovies.type = this.newMoviesType(i);
                result.push(typeMovies);
            }
            return result;
        };
        this.getNewTVs = (html) => {
            let $ = cheerio_1.default.load(html);
            let result = [];
            for (let i = 0; i < 5; i++) {
                let typeMovies = new homeResponse_1.MoviesListItemBean();
                let movies = [];
                $(".play-img", $(".img-list", $(".box")[1])[i]).each((i, elem) => {
                    let movie = this.getMovie($, elem);
                    movies.push(movie);
                });
                typeMovies.index = i;
                typeMovies.movies = movies;
                typeMovies.type = this.newTVsType(i);
                result.push(typeMovies);
            }
            return result;
        };
        this.getMovie = ($, elem) => {
            const address = this.getMovidId($, elem);
            return {
                "name": $(elem).attr("title"),
                //网页地址
                "address": address,
                //海报图片
                "post": $("img", elem).attr("original"),
                //豆瓣评分
                "douban": $("info", $(".pRightBottom", elem)).text(),
                //上映日期
                "year": $("info", $(".pLeftTop", elem)[0]).text(),
                "from": "dyjy",
            };
        };
        this.getMovidId = ($, elem) => {
            let address = $(elem).attr("href");
            let split = address.split("/");
            address = split[split.length - 1].split(".")[0];
            return address;
        };
        this.newTVsType = (index) => {
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
        this.newMoviesType = (index) => {
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
    getRec(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const myProxy = new proxy_1.default();
            const proxy = yield myProxy.getProxy();
            this.reqHtml(proxy, (result) => {
                myProxy.hasProxy(true);
                callback(result);
            }, (error) => {
                myProxy.hasProxy(false);
                this.getRec(callback);
            });
        });
    }
    reqHtml(proxy, resolve, reject) {
        const myReq = request_1.default.defaults({ "proxy": proxy });
        myReq.get("http://www.idyjy.com", { encoding: "binary", timeout: 1000 }, (error, response, res) => {
            if (error) {
                reject(error);
            }
            else {
                if (response.statusCode === 200) {
                    const body = iconv_lite_1.default.decode(Buffer.from(res, "binary"), "gbk");
                    const result = new homeResponse_1.HomeRecBean();
                    result.data.hotMovies = this.getHotMovie(body);
                    result.data.newTVs = this.getNewTVs(body);
                    result.data.newMovies = this.getNewMovies(body);
                    if (result.data.hotMovies.length !== 0 && result.data.newTVs.length !== 0 && result.data.newMovies.length !== 0) {
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
    }
}
exports.default = HomeRec;
