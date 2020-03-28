"use strict";
exports.__esModule = true;
/**
 * Created by 包俊 on 2018/5/28.
 */
var iconv_lite_1 = require("iconv-lite");
exports.transfer = function (xl) {
    if (xl.indexOf("thunder://") !== -1) {
        var origin_1 = xl.replace("thunder://", "");
        var buffer = Buffer.from(origin_1, "base64");
        var url = iconv_lite_1["default"].decode(buffer, "gbk");
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
