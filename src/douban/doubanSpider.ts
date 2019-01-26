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

export default class DoubanSpider {

  public start(total: boolean) {
    try {
      getMaxLength((length: number) => {
        console.log("total is " + length);
        let end = 1;
        if (!total) {
          end = length - 1500;
        }
        this.circle(length, end, () => {
          console.log("Douban spider finish!");
          process.exit(0);
        });
      });
    } catch (error) {
      console.log("DoubanSpider>>" + JSON.stringify(error));
      process.exit(0);
    }
  }

  public partUpdate(start: number) {
    try {
      this.circle(start, 1, () => {
        console.log("Douban spider finish!");
        process.exit(0);
      });
    } catch (error) {
      console.log("DoubanSpider>>" + JSON.stringify(error));
      process.exit(0);
    }
  }

  private circle(start: number, end: number, resolve: any) {
    this.handle(String(start), (result: IStatus) => {
      console.log(JSON.stringify(result));
      if (start >= end) {
        this.circle(start - 1, end, resolve);
      } else {
        resolve();
      }
    });
  }

  private handle(id: string, resolve: any) {
    const db = mongoose.createConnection(getDBAddress() + "/movies", { useNewUrlParser: true });
    const model = db.model("Movie", MovieSchema);
    db.on("error", (error) => {
      console.log(error);
      process.exit(0);
    });
    findOneByID(model, id, (detailFromDB: IDetails) => {
      if (detailFromDB.details.IMDB) {
        if (!detailFromDB.doubanID || detailFromDB.post.indexOf(".gif") !== -1 || !detailFromDB.details.average) {
          this.getDouban(detailFromDB.details.IMDB, (douban: IDoubanSearch) => {
            if (douban.total > 0 && douban.subjects.length > 0) {
              this.save(model, douban.subjects[0], detailFromDB, (result: IStatus) => {
                resolve(result);
              });
            } else {
              const status = new StatusBean();
              status.code = StatusBean.SUCCESS;
              status.error = "Douban>>>" + detailFromDB.id + " " + detailFromDB.name + ">>>查无资料";
              resolve(status);
            }
          });
        } else {
          const status = new StatusBean();
          status.code = StatusBean.SUCCESS;
          status.error = "Douban>>>" + detailFromDB.id + " " + detailFromDB.name + ">>>无需更新";
          resolve(status);
        }
      } else {
        const status = new StatusBean();
        status.code = StatusBean.SUCCESS;
        status.error = "Douban>>>" + detailFromDB.id + " " + detailFromDB.name + ">>>没有IMDB";
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
        status.error = ("Douban>>>" + detail.id + " " + detail.name + ">>>更新失败");
        resolve(status);
      } else {
        status.code = StatusBean.SUCCESS;
        status.error = ("Douban>>>" + detail.id + " " + detail.name + ">>>更新成功");
        resolve(status);
      }
    });
  }

  private async getDouban(imdb: string, callback: any) {
    const myProxy = new MyProxy();
    const proxy = await myProxy.getProxy();
    this.reqJson(imdb, proxy, (result: string) => {
      myProxy.hasProxy(true);
      callback(result);
    }, (error: any) => {
      myProxy.hasProxy(false);
      this.getDouban(imdb, callback);
    });
  }

  private reqJson(imdb: string, proxy: string, resolve: any, reject: any) {
    const myReq = request.defaults({ "proxy": proxy });
    myReq.get("http://api.douban.com/v2/movie/search?q=" + imdb,
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
