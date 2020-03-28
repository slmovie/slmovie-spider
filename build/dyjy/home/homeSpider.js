"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homeRec_1 = __importDefault(require("./homeRec"));
const homeSave_1 = require("./homeSave");
const LogUtils_1 = require("../../utils/LogUtils");
exports.startHomeSpider = (resolve) => {
    const homeRec = new homeRec_1.default();
    homeRec.getRec((bean) => {
        LogUtils_1.log("Home hmtl get");
        LogUtils_1.log(JSON.stringify(bean));
        homeSave_1.Save(bean).then(() => {
            resolve();
        });
    });
};
exports.getMaxLength = (callback) => {
    const homeRec = new homeRec_1.default();
    homeRec.getRec((bean) => {
        let id = 0;
        for (let i = 0; i < bean.data.hotMovies.length; i++) {
            if (id < Number(bean.data.hotMovies[i].address)) {
                id = Number(bean.data.hotMovies[i].address);
            }
        }
        for (let i = 0; i < bean.data.newMovies.length; i++) {
            for (let x = 0; x < bean.data.newMovies[i].movies.length; x++) {
                if (id < Number(bean.data.newMovies[i].movies[x].address)) {
                    id = Number(bean.data.newMovies[i].movies[x].address);
                }
            }
        }
        for (let i = 0; i < bean.data.newTVs.length; i++) {
            for (let x = 0; x < bean.data.newTVs[i].movies.length; x++) {
                if (id < Number(bean.data.newTVs[i].movies[x].address)) {
                    id = Number(bean.data.newTVs[i].movies[x].address);
                }
            }
        }
        callback(id);
    });
};
