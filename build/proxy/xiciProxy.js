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
const request_1 = __importDefault(require("request"));
const proxy_1 = require("../typings/proxy");
exports.getXiciPoxy = () => __awaiter(this, void 0, void 0, function* () {
    let res = yield reqHtml();
    let $ = cheerio_1.default.load(res);
    let tr = $("tr");
    const proxys = [];
    for (let line = 1; line < tr.length; line++) {
        let td = $(tr[line]).children("td");
        const proxy = new proxy_1.Proxy(String(td[5].children[0].data).toLowerCase() + "://" + td[1].children[0].data, td[2].children[0].data);
        proxys.push(proxy.getProxy());
    }
    return new Promise(resolve => {
        resolve(proxys);
    });
});
const address = ["https://www.xicidaili.com/nn/", "https://www.xicidaili.com/nt/",
    "https://www.xicidaili.com/wt/"];
const reqHtml = () => {
    const target = parseInt(String(Math.random() * 3), 10) + 1;
    const page = parseInt(String(Math.random() * 3), 10) + 1;
    return new Promise((resolve) => {
        console.log("url>>>" + address[target] + page);
        request_1.default.get(address[target], (error, response, body) => {
            if (error || response.statusCode !== 200) {
                resolve("0");
            }
            else {
                resolve(body);
            }
        });
    });
};
