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
/**
 * Created by 包俊 on 2018/5/15.
 */
const cheerio_1 = __importDefault(require("cheerio"));
const https_1 = __importDefault(require("https"));
const proxy_1 = require("../typings/proxy");
exports.getKuaiPoxy = () => __awaiter(this, void 0, void 0, function* () {
    const page = parseInt(String(Math.random() * 10), 10) + 1;
    let res = yield reqHtml(String(page));
    let $ = cheerio_1.default.load(res);
    let tr = $("tr");
    const proxys = [];
    for (let line = 1; line < tr.length; line++) {
        let td = $(tr[line]).children("td");
        const proxy = new proxy_1.Proxy("http://" + td[0].children[0].data, td[1].children[0].data);
        proxys.push(proxy.getProxy());
    }
    return new Promise(resolve => {
        resolve(proxys);
    });
});
const reqHtml = (page) => {
    return new Promise((resolve) => {
        console.log("url>>>https://ip.seofangfa.com/proxy/" + page + ".html");
        let req = https_1.default.get("https://ip.seofangfa.com/proxy/" + page + ".html", function (res) {
            let html = "";
            res.on("data", function (data) {
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
