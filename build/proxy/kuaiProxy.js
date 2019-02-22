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
const LogUtils_1 = require("../utils/LogUtils");
exports.getKuaiPoxy = () => __awaiter(this, void 0, void 0, function* () {
    const page = parseInt(String(Math.random() * 10), 10) + 1;
    const proxys = [];
    try {
        let res = yield reqHtml(String(page));
        let $ = cheerio_1.default.load(res);
        let tr = $("tr");
        for (let line = 1; line < tr.length; line++) {
            let td = $(tr[line]).children("td");
            const proxy = new proxy_1.Proxy("http://" + td[0].children[0].data, td[1].children[0].data);
            proxys.push(proxy.getProxy());
        }
    }
    catch (error) {
        LogUtils_1.log(error);
    }
    return new Promise(resolve => {
        resolve(proxys);
    });
});
const reqHtml = (page) => {
    return new Promise((resolve, reject) => {
        const url = "https://ip.seofangfa.com";
        LogUtils_1.log(url);
        request_1.default.get(url, { timeout: 1500 }, (error, response, body) => {
            if (error) {
                reject(error);
            }
            else if (response.statusCode !== 200) {
                reject(response.statusCode);
            }
            else {
                resolve(body);
            }
        });
    });
};
