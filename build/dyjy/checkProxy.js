"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./request");
const checkDyjy = (proxy) => {
    return new Promise((resolve, reject) => {
        request_1.getDetailHtml("4", proxy.getProxy()).then((response) => {
            if (response.statusCode === 200) {
                if (response.text.indexOf("您的请求过于频繁") === -1) {
                    resolve(proxy.host + ":" + proxy.port);
                }
                else {
                    reject("您的请求过于频繁");
                }
            }
            else {
                reject("Error: " + response.statusCode);
            }
        }).catch(error => {
            reject("request error");
        });
    });
};
exports.default = checkDyjy;
