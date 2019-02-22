"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const detail_1 = __importDefault(require("./detail"));
const mongoose_1 = __importDefault(require("mongoose"));
const dbConstans_1 = require("../../dbConstans");
const status_1 = require("../../typings/status");
const detailCon_1 = require("./detailCon");
const LogUtils_1 = require("../../utils/LogUtils");
const db = mongoose_1.default.createConnection(dbConstans_1.getDBAddress() + "/movies", { useNewUrlParser: true });
const SaveDetail = (id, resolve) => {
    const detailSpider = new detail_1.default();
    const status = new status_1.StatusBean();
    detailSpider.getDatail(id, (detail) => {
        try {
            db.on("error", (error) => {
                LogUtils_1.log(error);
                process.exit(0);
            });
            const model = db.model("Movie", detailCon_1.MovieSchema);
            if (detail) {
                exports.findOneByID(model, id, (detailFromDB) => {
                    if (detail.files.length !== 0) {
                        let update = false;
                        if (detail.files.length !== detailFromDB.files.length) {
                            update = true;
                        }
                        if (!update) {
                            for (let i = 0; i < detail.files.length; i++) {
                                if (detail.files[i].download !== detailFromDB.files[i].download) {
                                    update = true;
                                }
                                if (update) {
                                    break;
                                }
                            }
                        }
                        if (update) {
                            model.updateOne({ id: id }, { $set: { "files": detail.files } }, (err) => {
                                if (err) {
                                    status.code = status_1.StatusBean.FAILED_NEED_REPEAT;
                                    status.error = (id + " 更新失败");
                                    resolve(status);
                                }
                                else {
                                    status.code = status_1.StatusBean.SUCCESS;
                                    status.error = (id + " 更新成功");
                                    resolve(status);
                                }
                            });
                        }
                        else {
                            status.code = status_1.StatusBean.SUCCESS;
                            //无需更新
                            resolve(status);
                        }
                    }
                    else {
                        status.code = status_1.StatusBean.SUCCESS;
                        //无需更新
                        resolve(status);
                    }
                }, () => {
                    model.create(detail, (error) => {
                        if (error) {
                            status.code = status_1.StatusBean.FAILED_NEED_REPEAT;
                            status.error = (id + " " + error);
                            resolve(status);
                        }
                        else {
                            status.code = status_1.StatusBean.SUCCESS;
                            status.error = (id + " 保存成功");
                            resolve(status);
                        }
                    });
                });
            }
            else {
                status.code = status_1.StatusBean.SUCCESS;
                //不存在
                resolve(status);
            }
        }
        catch (error) {
            LogUtils_1.log("catch>>>" + error);
            SaveDetail(id, resolve);
        }
    });
};
exports.findOneByID = (model, id, resolve, reject) => {
    model.findOne({ id: id }, (error, doc) => {
        if (error || doc == null) {
            reject();
        }
        else {
            resolve(doc);
        }
    });
};
exports.default = SaveDetail;
