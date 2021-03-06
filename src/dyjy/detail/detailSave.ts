import DetailSpider from "./detail";
import mongoose from "mongoose";
import { getDBAddress } from "../../dbConstans";
import { StatusBean } from "../../typings/status";
import { IDetails } from "../../typings/detailResponse";
import { MovieSchema } from "./detailCon";
import { log } from "../../utils/LogUtils";

const db = mongoose.createConnection(getDBAddress() + "/movies", {
  useNewUrlParser: true
});

db.catch(error => {
  log(error);
  process.exit(0);
});

const SaveDetail = (id: string, resolve: any) => {
  const detailSpider = new DetailSpider();
  const status = new StatusBean();
  detailSpider.getDatail(id, (detail: IDetails) => {
    try {
      const model = db.model("Movie", MovieSchema);
      if (detail) {
        findOneByID(
          model,
          id,
          (detailFromDB: IDetails) => {
            if (detail.files.length !== 0) {
              let update = false;
              if (detail.files.length !== detailFromDB.files.length) {
                update = true;
              }
              if (!update) {
                for (let i = 0; i < detail.files.length; i++) {
                  if (
                    detail.files[i].download !== detailFromDB.files[i].download
                  ) {
                    update = true;
                  }
                  if (update) {
                    break;
                  }
                }
              }
              if (update) {
                model.updateOne(
                  { id: id },
                  { $set: { files: detail.files } },
                  (err: any) => {
                    if (err) {
                      status.code = StatusBean.FAILED_NEED_REPEAT;
                      status.error = id + " 更新失败";
                      resolve(status);
                    } else {
                      status.code = StatusBean.SUCCESS;
                      status.error = id + " 更新成功";
                      resolve(status);
                    }
                  }
                );
              } else {
                status.code = StatusBean.SUCCESS;
                status.error = id + " 无需更新";
                resolve(status);
              }
            } else {
              status.code = StatusBean.SUCCESS;
              status.error = id + " 无需更新";
              resolve(status);
            }
          },
          () => {
            model.create(detail, (error: any) => {
              if (error) {
                status.code = StatusBean.FAILED_NEED_REPEAT;
                status.error = id + " " + error;
                console.log(error);
                resolve(status);
              } else {
                status.code = StatusBean.SUCCESS;
                status.error = id + " 保存成功";
                resolve(status);
              }
            });
          }
        );
      } else {
        status.code = StatusBean.SUCCESS;
        status.error = id + " 不存在";
        resolve(status);
      }
    } catch (error) {
      log("catch>>>" + error);
      SaveDetail(id, resolve);
    }
  });
};

export const findOneByID = (
  model: any,
  id: string,
  resolve: any,
  reject: any
) => {
  model.findOne({ id: id }, (error: any, doc: any) => {
    if (error || doc == null) {
      reject();
    } else {
      resolve(doc);
    }
  });
};

export default SaveDetail;
