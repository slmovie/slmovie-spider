"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
/**
 * Created by 包俊 on 2017/3/27.
 */
var movieFiles = new mongoose_1["default"].Schema({
    name: String,
    download: String,
    fileSize: String
});
var details = new mongoose_1["default"].Schema({
    name: String,
    year: String,
    location: String,
    type: String,
    actor: String,
    director: String,
    otherName: String,
    IMDB: String,
    status: String,
    TV: Boolean,
    average: String
});
exports.MovieSchema = new mongoose_1["default"].Schema({
    name: String,
    post: String,
    describe: String,
    detail: [String],
    details: details,
    files: [movieFiles],
    id: String,
    doubanID: String
});
