"use strict";
exports.__esModule = true;
/**
 * Created by 包俊 on 2017/7/20.
 */
var mongoose_1 = require("mongoose");
var dbConstans_1 = require("../../dbConstans");
exports.MovieSchema = new mongoose_1["default"].Schema({
    name: String,
    address: String,
    post: String,
    douban: String,
    year: String
});
exports.DBName = {
    HotMovies: "/hotMovies",
    NewMovies: "/newMovies",
    NewTvs: "/newtvs"
};
exports.HotMoviesTabkleName = "hotmovie";
exports.NewMoviesTableName = {
    ActionMovie: "actionmovie",
    Comedy: "comedy",
    LoveMovie: "lovemovie",
    ScienceMovie: "sciencemovie",
    HorrorMovie: "horrormovie",
    DramaMovie: "dramamovie",
    WarMovie: "warmovie",
    NewMovie: "newmovie"
};
exports.getDB = function (table) {
    var db = mongoose_1["default"].createConnection(dbConstans_1.getDBAddress() + table, {
        useNewUrlParser: true
    });
    db["catch"](function (error) {
        console.log(error);
        process.exit(0);
    });
    return db;
};
exports.getModel = function (db, table) {
    return db.model(table, exports.MovieSchema);
};
exports.getNewMoviesModelName = function (index) {
    if (index === 1) {
        return exports.NewMoviesTableName.ActionMovie;
    }
    else if (index === 2) {
        return exports.NewMoviesTableName.Comedy;
    }
    else if (index === 3) {
        return exports.NewMoviesTableName.LoveMovie;
    }
    else if (index === 4) {
        return exports.NewMoviesTableName.ScienceMovie;
    }
    else if (index === 5) {
        return exports.NewMoviesTableName.HorrorMovie;
    }
    else if (index === 6) {
        return exports.NewMoviesTableName.DramaMovie;
    }
    else if (index === 7) {
        return exports.NewMoviesTableName.WarMovie;
    }
    else {
        return exports.NewMoviesTableName.NewMovie;
    }
};
exports.NewTVsTableName = {
    NewTv: "newtv",
    ChinaTv: "chinatv",
    GongTaiTv: "hongtaitv",
    WestenTv: "westentv",
    JapanKoreanTv: "japankoreatv"
};
exports.getNewTvsModelName = function (index) {
    if (index === 1) {
        return exports.NewTVsTableName.ChinaTv;
    }
    else if (index === 2) {
        return exports.NewTVsTableName.GongTaiTv;
    }
    else if (index === 3) {
        return exports.NewTVsTableName.WestenTv;
    }
    else if (index === 4) {
        return exports.NewTVsTableName.JapanKoreanTv;
    }
    else {
        return exports.NewTVsTableName.NewTv;
    }
};
