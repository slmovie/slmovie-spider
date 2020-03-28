"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Created by 包俊 on 2017/3/27.
 */
const movieFiles = new mongoose_1.default.Schema({
    name: String,
    download: String,
    fileSize: String,
});
const details = new mongoose_1.default.Schema({
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
    average: String,
});
exports.MovieSchema = new mongoose_1.default.Schema({
    name: String,
    post: String,
    describe: String,
    detail: [String],
    details: details,
    files: [movieFiles],
    id: String,
    doubanID: String,
});
