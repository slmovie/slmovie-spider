"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const proxy_1 = __importDefault(require("../proxy/proxy"));
const mongoose_1 = __importDefault(require("mongoose"));
const detailCon_1 = require("../dyjy/detail/detailCon");
const dbConstans_1 = require("../dbConstans");
const status_1 = require("../typings/status");
const detailSave_1 = require("../dyjy/detail/detailSave");
const homeSpider_1 = require("../dyjy/home/homeSpider");
class DoubanSpider {
    start(total) {
        try {
            homeSpider_1.getMaxLength((length) => {
                console.log("total is " + length);
                let end = 1;
                if (!total) {
                    end = length - 500;
                }
                this.circle(length, end, () => {
                    console.log("Douban spider finish!");
                    process.exit(0);
                });
            });
        }
        catch (error) {
            console.log("DoubanSpider>>" + JSON.stringify(error));
            process.exit(0);
        }
    }
    partUpdate(start, end) {
        try {
            this.circle(start, end, () => {
                console.log("Douban spider finish!");
                process.exit(0);
            });
        }
        catch (error) {
            console.log("DoubanSpider>>" + JSON.stringify(error));
            process.exit(0);
        }
    }
    circle(start, end, resolve) {
        this.handle(String(start), (result) => {
            console.log(JSON.stringify(result));
            if (start >= end) {
                this.circle(start - 1, end, resolve);
            }
            else {
                resolve();
            }
        });
    }
    handle(id, resolve) {
        const model = DoubanSpider.db.model("Movie", detailCon_1.MovieSchema);
        DoubanSpider.db.on("error", (error) => {
            console.log(error);
            process.exit(0);
        });
        detailSave_1.findOneByID(model, id, (detailFromDB) => {
            if (detailFromDB.details.IMDB) {
                if (!detailFromDB.doubanID || detailFromDB.post.indexOf(".gif") !== -1 || !detailFromDB.details.average) {
                    this.getDouban(detailFromDB.details.IMDB, (douban) => {
                        if (douban.total > 0 && douban.subjects.length > 0) {
                            this.save(model, douban.subjects[0], detailFromDB, (result) => {
                                resolve(result);
                            });
                        }
                        else {
                            const status = new status_1.StatusBean();
                            status.code = status_1.StatusBean.SUCCESS;
                            status.error = "Douban>>>" + detailFromDB.id + " " + detailFromDB.name + ">>>查无资料";
                            resolve(status);
                        }
                    });
                }
                else {
                    const status = new status_1.StatusBean();
                    status.code = status_1.StatusBean.SUCCESS;
                    status.error = "Douban>>>" + detailFromDB.id + " " + detailFromDB.name + ">>>无需更新";
                    resolve(status);
                }
            }
            else {
                const status = new status_1.StatusBean();
                status.code = status_1.StatusBean.SUCCESS;
                status.error = "Douban>>>" + detailFromDB.id + " " + detailFromDB.name + ">>>没有IMDB";
                resolve(status);
            }
        }, () => {
            const status = new status_1.StatusBean();
            status.code = status_1.StatusBean.SUCCESS;
            status.error = "没有ID";
            resolve(status);
        });
    }
    save(model, douban, detail, resolve) {
        if (detail.post.indexOf(".gif")) {
            detail.post = douban.images.medium ? douban.images.medium : douban.images.large ? douban.images.large : douban.images.small ? douban.images.small : "";
        }
        detail.details.average = douban.rating.average;
        const status = new status_1.StatusBean();
        model.updateOne({ id: detail.id }, { $set: { "doubanID": douban.id, "post": detail.post, "details": detail.details } }, (err) => {
            if (err) {
                status.code = status_1.StatusBean.FAILED_NEED_REPEAT;
                status.error = ("Douban>>>" + detail.id + " " + detail.name + ">>>更新失败");
                resolve(status);
            }
            else {
                status.code = status_1.StatusBean.SUCCESS;
                status.error = ("Douban>>>" + detail.id + " " + detail.name + ">>>更新成功");
                resolve(status);
            }
        });
    }
    getDouban(imdb, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const myProxy = new proxy_1.default();
            const proxy = yield myProxy.getProxy();
            this.reqJson(imdb, proxy, (result) => {
                myProxy.hasProxy(true);
                callback(result);
            }, (error) => {
                myProxy.hasProxy(false);
                this.getDouban(imdb, callback);
            });
        });
    }
    reqJson(imdb, proxy, resolve, reject) {
        const myReq = request_1.default.defaults({ "proxy": proxy });
        myReq.get("http://api.douban.com/v2/movie/search?q=" + imdb, { json: true, timeout: 1500 }, (error, response, body) => {
            if (error) {
                reject(error);
            }
            else {
                if (response.statusCode === 200) {
                    resolve(body);
                }
                else {
                    reject("statusCode>>>" + response.statusCode);
                }
            }
        });
    }
}
DoubanSpider.db = mongoose_1.default.createConnection(dbConstans_1.getDBAddress() + "/movies", { useNewUrlParser: true });
exports.default = DoubanSpider;
