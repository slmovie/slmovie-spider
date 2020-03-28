"use strict";
exports.__esModule = true;
var homeRec_1 = require("./homeRec");
var homeSave_1 = require("./homeSave");
var LogUtils_1 = require("../../utils/LogUtils");
exports.startHomeSpider = function (resolve) {
    var homeRec = new homeRec_1["default"]();
    homeRec.getRec(function (bean) {
        LogUtils_1.log("Home hmtl get");
        LogUtils_1.log(JSON.stringify(bean));
        homeSave_1.Save(bean).then(function () {
            resolve();
        });
    });
};
exports.getMaxLength = function (callback) {
    var homeRec = new homeRec_1["default"]();
    homeRec.getRec(function (bean) {
        var id = 0;
        for (var i = 0; i < bean.data.hotMovies.length; i++) {
            if (id < Number(bean.data.hotMovies[i].address)) {
                id = Number(bean.data.hotMovies[i].address);
            }
        }
        for (var i = 0; i < bean.data.newMovies.length; i++) {
            for (var x = 0; x < bean.data.newMovies[i].movies.length; x++) {
                if (id < Number(bean.data.newMovies[i].movies[x].address)) {
                    id = Number(bean.data.newMovies[i].movies[x].address);
                }
            }
        }
        for (var i = 0; i < bean.data.newTVs.length; i++) {
            for (var x = 0; x < bean.data.newTVs[i].movies.length; x++) {
                if (id < Number(bean.data.newTVs[i].movies[x].address)) {
                    id = Number(bean.data.newTVs[i].movies[x].address);
                }
            }
        }
        callback(id);
    });
};
