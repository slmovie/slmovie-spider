"use strict";
exports.__esModule = true;
/**
 * Created by 包俊 on 2017/7/20.
 */
var homeCon_1 = require("./homeCon");
var LogUtils_1 = require("../../utils/LogUtils");
exports.Save = function (doc) {
    return new Promise(function (resolve, reject) {
        saveHotMovies(doc.data.hotMovies).then(function () {
            LogUtils_1.log("Hot Movies finish");
            saveNewTVs(doc.data.newTVs).then(function () {
                LogUtils_1.log("New Tvs finish");
                saveNewMovies(doc.data.newMovies).then(function () {
                    LogUtils_1.log("New Movies finish");
                    resolve();
                });
            });
        });
    });
};
var saveHotMovies = function (docs) {
    return new Promise(function (resolve, reject) {
        var db = homeCon_1.getDB(homeCon_1.DBName.HotMovies);
        var model = homeCon_1.getModel(db, homeCon_1.HotMoviesTabkleName);
        saveMovie(docs, model, db)
            .then(function () { return resolve(); })["catch"](function (error) {
            LogUtils_1.log("Hot Movies error " + error);
            resolve();
        });
    });
};
var saveNewMovies = function (data) {
    return new Promise(function (resolve, reject) {
        var db = homeCon_1.getDB(homeCon_1.DBName.NewMovies);
        var index = 0;
        var _loop_1 = function (i) {
            var model = homeCon_1.getModel(db, homeCon_1.getNewMoviesModelName(data[i].index));
            saveMovie(data[i].movies, model, db)
                .then(function () {
                index = index + 1;
                // log("New Movies>>>>>" + getNewMoviesModelName(data[i].index) + " finish");
                if (index === data.length) {
                    resolve();
                }
            })["catch"](function (error) {
                LogUtils_1.log("New Movies>>>>>" +
                    homeCon_1.getNewMoviesModelName(data[i].index) +
                    " error " +
                    error);
                resolve();
            });
        };
        for (var i = 0; i < data.length; i++) {
            _loop_1(i);
        }
    });
};
var saveNewTVs = function (data) {
    return new Promise(function (resolve, reject) {
        var db = homeCon_1.getDB(homeCon_1.DBName.NewTvs);
        var index = 0;
        var _loop_2 = function (i) {
            var model = homeCon_1.getModel(db, homeCon_1.getNewTvsModelName(data[i].index));
            saveMovie(data[i].movies, model, db)
                .then(function () {
                index = index + 1;
                // log("New TVs>>>>>" + getNewTvsModelName(data[i].index) + " finish");
                if (index === data.length) {
                    resolve();
                }
            })["catch"](function (error) {
                LogUtils_1.log("New TVs>>>>>" +
                    homeCon_1.getNewTvsModelName(data[i].index) +
                    " error" +
                    error);
                resolve();
            });
        };
        for (var i = 0; i < data.length; i++) {
            _loop_2(i);
        }
    });
};
var saveMovie = function (docs, model, db) {
    return new Promise(function (resolve, reject) {
        model.deleteMany({}, function (err) {
            if (err) {
                LogUtils_1.log("saveMovie>>>remove>>>" + err);
                reject();
            }
            else {
                model.create(docs, function (err) {
                    if (err) {
                        LogUtils_1.log("saveMovie>>>create>>>" + err);
                        reject();
                    }
                    else {
                        resolve();
                    }
                    db.close();
                });
            }
        });
    });
};
