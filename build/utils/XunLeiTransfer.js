"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by 包俊 on 2018/5/28.
 */
const iconv_lite_1 = __importDefault(require("iconv-lite"));
exports.transfer = (xl) => {
    if (xl.indexOf("thunder://") !== -1) {
        let origin = xl.replace("thunder://", "");
        let buffer = Buffer.from(origin, "base64");
        let url = iconv_lite_1.default.decode(buffer, "gbk");
        url = url.slice(2, url.length - 2);
        if (url.indexOf("电影家园www.idyjy.com下载") !== -1) {
            url = url.replace("电影家园www.idyjy.com", "双龙影视www.slys.in");
        }
        return url;
    }
    else {
        return xl;
    }
};
