"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DateFormat_1 = require("./DateFormat");
exports.log = (log, time = false) => {
    if (time) {
        console.log(DateFormat_1.getTimeFormat(Date.now()) + " " + log);
    }
    else {
        console.log(log);
    }
};
