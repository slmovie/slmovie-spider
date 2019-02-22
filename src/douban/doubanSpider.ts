import request from "request";
import MyProxy from "../proxy/proxy";
import mongoose from "mongoose";
import { MovieSchema } from "../dyjy/detail/detailCon";
import { IDoubanSearch, IDoubanSubject } from "../typings/doubanSearch";
import { getDBAddress } from "../dbConstans";
import { IDetails } from "../typings/detailResponse";
import { StatusBean, IStatus } from "../typings/status";
import { findOneByID } from "../dyjy/detail/detailSave";
import { getMaxLength } from "../dyjy/home/homeSpider";
import chinese2Utf8 from "../utils/chinese2Utf8";
import { log } from "../utils/LogUtils";

export default class DoubanSpider {
  static db = mongoose.createConnection(getDBAddress() + "/movies", { useNewUrlParser: true });
  public start(total: boolean) {
    try {
      getMaxLength((length: number) => {
        log("total is " + length);
        let end = 1;
        if (!total) {
          end = length - 500;
        }
        this.circle(length, end, () => {
          log("Douban spider finish!", true);
          process.exit(0);
        });
      });
    } catch (error) {
      log("DoubanSpider>>" + JSON.stringify(error));
      process.exit(0);
    }
  }

  public partUpdate(start: number, end: number) {
    try {
      this.circle(start, end, () => {
        log("Douban spider finish!", true);
        process.exit(0);
      });
    } catch (error) {
      log("DoubanSpider>>" + JSON.stringify(error));
      process.exit(0);
    }
  }

  public updateOne(id: number) {
    try {
      this.handle(String(id), (result: IStatus) => {
        log(JSON.stringify(result.error));
      });
    } catch (error) {
      log(error);
    }
  }

  private circle(start: number, end: number, resolve: any) {
    this.handle(String(start), (result: IStatus) => {
      log(JSON.stringify(result.error));
      if (start >= end) {
        this.circle(start - 1, end, resolve);
      } else {
        resolve();
      }
    });
  }

  private handle(id: string, resolve: any) {
    const model = DoubanSpider.db.model("Movie", MovieSchema);
    DoubanSpider.db.on("error", (error) => {
      log(error);
      process.exit(0);
    });
    findOneByID(model, id, (detailFromDB: IDetails) => {
      let imdb = detailFromDB.details.IMDB;
      let name = detailFromDB.name;
      if (imdb || name) {
        // if (!detailFromDB.doubanID || detailFromDB.post.indexOf(".gif") !== -1 || !detailFromDB.details.average) {
        this.getDouban(imdb, name, (douban: IDoubanSearch) => {
          if (douban.total > 0 && douban.subjects.length > 0) {
            this.save(model, douban.subjects[0], detailFromDB, (result: IStatus) => {
              resolve(result);
            });
          } else {
            const status = new StatusBean();
            status.code = StatusBean.SUCCESS;
            status.error = detailFromDB.id + ">>>无资料";
            resolve(status);
          }
        });
        // } else {
        //   const status = new StatusBean();
        //   status.code = StatusBean.SUCCESS;
        //   status.error = "Douban>>>" + detailFromDB.id + " " + detailFromDB.name + ">>>无需更新";
        //   resolve(status);
        // }
      } else {
        const status = new StatusBean();
        status.code = StatusBean.SUCCESS;
        status.error = detailFromDB.id + ">>>没有IMDB和名字";
        resolve(status);
      }
    }, () => {
      const status = new StatusBean();
      status.code = StatusBean.SUCCESS;
      status.error = "没有ID";
      resolve(status);
    });
  }

  private save(model: any, douban: IDoubanSubject, detail: IDetails, resolve: any) {
    if (detail.post.indexOf(".gif")) {
      detail.post = douban.images.medium ? douban.images.medium : douban.images.large ? douban.images.large : douban.images.small ? douban.images.small : "";
    }
    detail.details.average = douban.rating.average;
    const status = new StatusBean();
    model.updateOne({ id: detail.id }, { $set: { "doubanID": douban.id, "post": detail.post, "details": detail.details }}, (err: any) => {
      if (err) {
        status.code = StatusBean.FAILED_NEED_REPEAT;
        status.error = (detail.id + ">>>更新失败");
        resolve(status);
      } else {
        status.code = StatusBean.SUCCESS;
        status.error = (detail.id + ">>>更新成功");
        resolve(status);
      }
    });
  }

  private async getDouban(imdb: string, name: string, callback: any) {
    let search;
    if (imdb) {
      search = imdb;
    } else {
      search = chinese2Utf8(name);
    }
    const myProxy = new MyProxy();
    const proxy = await myProxy.getProxy();
    this.reqJson(search, proxy, (result: string) => {
      myProxy.hasProxy(true);
      // log(result);
      callback(result);
    }, (error: any) => {
      // log(error);
      myProxy.hasProxy(false);
      this.getDouban(imdb, name, callback);
    });
  }

  private reqJson(search: string, proxy: string, resolve: any, reject: any) {
    const myReq = request.defaults({ "proxy": proxy });
    const url = "http://api.douban.com/v2/movie/search?q=" + search;
    myReq.get(url,
      { json: true, timeout: 1500 },
      (error, response, body: string) => {
        if (error) {
          reject(error);
        } else {
          if (response.statusCode === 200) {
            resolve(body);
          } else {
            reject("statusCode>>>" + response.statusCode);
          }
        }
      });
  }
}
