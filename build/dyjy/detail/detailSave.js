"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const detail_1 = __importDefault(require("./detail"));
const detailCon_1 = require("./detailCon");
const status_1 = require("../../typings/status");
const SaveDetail = (id, resolve) => {
    const detailSpider = new detail_1.default();
    const status = new status_1.StatusBean();
    try {
        detailSpider.getDatail(id, (detail) => {
            const db = detailCon_1.MoviesDB();
            if (detail) {
                findOneByID(db, id, (detailFromDB) => {
                    if (detailFromDB === 0) {
                        detailCon_1.MovieModel(db).create(detail, function (error) {
                            if (error) {
                                status.code = status_1.StatusBean.FAILED_NEED_REPEAT;
                                status.error = ("SaveDetail>>>" + id + " " + detail.name + ">>>保存失败");
                                resolve(status);
                            }
                            else {
                                status.code = status_1.StatusBean.SUCCESS;
                                status.error = ("SaveDetail>>>" + id + " " + detail.name + ">>>保存成功");
                                resolve(status);
                            }
                            db.close();
                        });
                    }
                    else if (JSON.stringify(detail.files) === JSON.stringify(detailFromDB.files)) {
                        detailCon_1.MovieModel(db).update({ id: id }, { $set: detail }, (err) => {
                            if (err) {
                                status.code = status_1.StatusBean.FAILED_NEED_REPEAT;
                                status.error = ("SaveDetail>>>" + id + " " + detail.name + ">>>更新失败");
                                resolve(status);
                            }
                            else {
                                status.code = status_1.StatusBean.SUCCESS;
                                status.error = ("SaveDetail>>>" + id + " " + detail.name + ">>>更新成功");
                                resolve(status);
                            }
                            db.close();
                        });
                    }
                    else {
                        status.code = status_1.StatusBean.SUCCESS;
                        status.error = ("SaveDetail>>>" + id + " " + detail.name + ">>>无需更新");
                        resolve(status);
                    }
                });
            }
            else {
                status.code = status_1.StatusBean.SUCCESS;
                status.error = ("SaveDetail>>>" + id + ">>>不存在");
                resolve(status);
            }
        });
    }
    catch (error) {
        SaveDetail(id, resolve);
    }
};
const findOneByID = (db, id, send) => {
    detailCon_1.MovieModel(db).findOne({ id: id }, function (error, doc) {
        if (error || doc == null) {
            send(0);
        }
        else {
            send(doc);
        }
    });
};
exports.default = SaveDetail;
