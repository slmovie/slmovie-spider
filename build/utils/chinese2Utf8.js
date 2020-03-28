"use strict";
/**
 * Created by BJ on 2017/2/9.
 */
let iconv = require("iconv-lite");
module.exports = function chinese2Utf8(data) {
    let gb2312 = iconv.encode(data.toString("utf-8"), "utf-8");
    let gb2312Hex = "";
    for (let i = 0; i < gb2312.length; ++i) {
        gb2312Hex += toHex(gb2312[i]);
    }
    return gb2312Hex.toUpperCase();
};
let toHex = function (chr, padLen) {
    let len = 2;
    if (padLen) {
        len = padLen;
    }
    return pad(chr.toString(16), len);
};
let pad = function (number, length, pos) {
    let str = "%" + number;
    while (str.length < length) {
        //向右边补0
        if (pos === "r") {
            str = str + "0";
        }
        else {
            str = "0" + str;
        }
    }
    return str;
};
