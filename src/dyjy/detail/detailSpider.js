"use strict";
exports.__esModule = true;
var detailSave_1 = require("./detailSave");
var LogUtils_1 = require("../../utils/LogUtils");
exports.startDetailSpider = function (start, end, resolve) {
    try {
        var exculdes = [14514, 14515, 14455, 14452, 14448, 14439];
        if (exculdes.indexOf(start) === -1) {
            detailSave_1["default"](String(start), function (result) {
                if (result.error) {
                    LogUtils_1.log(JSON.stringify(result.error));
                }
                if (start >= end) {
                    exports.startDetailSpider(start - 1, end, resolve);
                }
                else {
                    resolve();
                }
            });
        }
        else {
            exports.startDetailSpider(start - 1, end, resolve);
        }
    }
    catch (error) {
        LogUtils_1.log("startDetailSpider>>>reject>>>" + JSON.stringify(error));
        exports.startDetailSpider(start, end, resolve);
    }
};
