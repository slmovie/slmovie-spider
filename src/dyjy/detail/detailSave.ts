import DetailSpider from "./detail";
import mongoose from "mongoose";
import { getDBAddress } from "../../dbConstans";
import { StatusBean } from "../../typings/status";
import { IDetails } from "../../typings/detailResponse";
import { MovieSchema } from "./detailCon";

const SaveDetail = (id: string, resolve: any) => {
  const detailSpider = new DetailSpider();
  const status = new StatusBean();
  detailSpider.getDatail(id, (detail: IDetails) => {
    try {
      const db = mongoose.createConnection(getDBAddress() + "/movies", { useNewUrlParser: true });
      db.on("error", (error) => {
        console.log(error);
        process.exit(0);
      });
      const model = db.model("Movie", MovieSchema);
      if (detail) {
        findOneByID(model, id, (detailFromDB: any) => {
          if (detailFromDB === 0) {
            model.create(detail, (error: any) => {
              if (error) {
                status.code = StatusBean.FAILED_NEED_REPEAT;
                status.error = ("SaveDetail>>>" + id + " " + detail.name + ">>>保存失败");
                resolve(status);
              } else {
                status.code = StatusBean.SUCCESS;
                status.error = ("SaveDetail>>>" + id + " " + detail.name + ">>>保存成功");
                resolve(status);
              }
              db.close();
            });
          } else if (detail.files.length !== 0 && JSON.stringify(detail.files) === JSON.stringify(detailFromDB.files)) {
            model.update({ id: id }, { $set: detail }, (err: any) => {
              if (err) {
                status.code = StatusBean.FAILED_NEED_REPEAT;
                status.error = ("SaveDetail>>>" + id + " " + detail.name + ">>>更新失败");
                resolve(status);
              } else {
                status.code = StatusBean.SUCCESS;
                status.error = ("SaveDetail>>>" + id + " " + detail.name + ">>>更新成功");
                resolve(status);
              }
              db.close();
            });
          } else {
            status.code = StatusBean.SUCCESS;
            status.error = ("SaveDetail>>>" + id + " " + detail.name + ">>>无需更新");
            resolve(status);
          }
        });
      } else {
        status.code = StatusBean.SUCCESS;
        status.error = ("SaveDetail>>>" + id + ">>>不存在");
        resolve(status);
      }
    } catch (error) {
      console.log("catch>>>" + error);
      SaveDetail(id, resolve);
    }
  });
};

const findOneByID = (model: any, id: string, send: any) => {
  model.findOne({ id: id }, (error: any, doc: any) => {
    if (error || doc == null) {
      send(0);
    } else {
      send(doc);
    }
  });
};

export default SaveDetail;