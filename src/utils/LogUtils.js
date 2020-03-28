"use strict";
exports.__esModule = true;
var DateFormat_1 = require("./DateFormat");
exports.log = function (log, time) {
    if (time === void 0) { time = false; }
    if (time) {
        console.log(DateFormat_1.getTimeFormat(Date.now()) + " " + log);
    }
    else {
        console.log(log);
    }
};
