"use strict";
exports.__esModule = true;
var detail_1 = require("./detail");
var mongoose_1 = require("mongoose");
var dbConstans_1 = require("../../dbConstans");
var status_1 = require("../../typings/status");
var detailCon_1 = require("./detailCon");
var LogUtils_1 = require("../../utils/LogUtils");
var db = mongoose_1["default"].createConnection(dbConstans_1.getDBAddress() + "/movies", {
    useNewUrlParser: true
});
db["catch"](function (error) {
    LogUtils_1.log(error);
    process.exit(0);
});
var SaveDetail = function (id, resolve) {
    var detailSpider = new detail_1["default"]();
    var status = new status_1.StatusBean();
    detailSpider.getDatail(id, function (detail) {
        try {
            var model_1 = db.model("Movie", detailCon_1.MovieSchema);
            if (detail) {
                exports.findOneByID(model_1, id, function (detailFromDB) {
                    if (detail.files.length !== 0) {
                        var update = false;
                        if (detail.files.length !== detailFromDB.files.length) {
                            update = true;
                        }
                        if (!update) {
                            for (var i = 0; i < detail.files.length; i++) {
                                if (detail.files[i].download !== detailFromDB.files[i].download) {
                                    update = true;
                                }
                                if (update) {
                                    break;
                                }
                            }
                        }
                        if (update) {
                            model_1.updateOne({ id: id }, { $set: { files: detail.files } }, function (err) {
                                if (err) {
                                    status.code = status_1.StatusBean.FAILED_NEED_REPEAT;
                                    status.error = id + " 更新失败";
                                    resolve(status);
                                }
                                else {
                                    status.code = status_1.StatusBean.SUCCESS;
                                    status.error = id + " 更新成功";
                                    resolve(status);
                                }
                            });
                        }
                        else {
                            status.code = status_1.StatusBean.SUCCESS;
                            status.error = id + " 无需更新";
                            resolve(status);
                        }
                    }
                    else {
                        status.code = status_1.StatusBean.SUCCESS;
                        status.error = id + " 无需更新";
                        resolve(status);
                    }
                }, function () {
                    model_1.create(detail, function (error) {
                        if (error) {
                            status.code = status_1.StatusBean.FAILED_NEED_REPEAT;
                            status.error = id + " " + error;
                            console.log(error);
                            resolve(status);
                        }
                        else {
                            status.code = status_1.StatusBean.SUCCESS;
                            status.error = id + " 保存成功";
                            resolve(status);
                        }
                    });
                });
            }
            else {
                status.code = status_1.StatusBean.SUCCESS;
                status.error = id + " 不存在";
                resolve(status);
            }
        }
        catch (error) {
            LogUtils_1.log("catch>>>" + error);
            SaveDetail(id, resolve);
        }
    });
};
exports.findOneByID = function (model, id, resolve, reject) {
    model.findOne({ id: id }, function (error, doc) {
        if (error || doc == null) {
            reject();
        }
        else {
            resolve(doc);
        }
    });
};
exports["default"] = SaveDetail;
