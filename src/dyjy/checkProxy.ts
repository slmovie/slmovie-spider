/**
 * Created by 包俊 on 2018/5/15.
 */
import { Proxy } from "../typings/proxy";
import { getDetailHtml } from "./request";

const checkDyjy = (proxy: Proxy): Promise<string> => {
  return new Promise((resolve, reject) => {
    getDetailHtml("4", proxy.getProxy()).then((response) => {
      if (response.statusCode === 200) {
        if (response.text.indexOf("您的请求过于频繁") === -1) {
          resolve(proxy.host + ":" + proxy.port);
        } else {
          reject("您的请求过于频繁");
        }
      } else {
        reject("Error: " + response.statusCode);
      }
    }).catch(error => {
      reject("request error");
    });
  });
};

export default checkDyjy;