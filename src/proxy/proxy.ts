/**
 * Created by 包俊 on 2018/5/15.
 */
import { getKuaiPoxy } from "./kuaiProxy";
import { getXiciPoxy } from "./xiciProxy";

let Proxy = "";
let Proxys: string[] = [];
let hasProxy = false;

export default class MyProxy {
  public async getProxy() {
    if (!hasProxy) {
      if (Proxys.length === 0) {
        const target = parseInt(String(Math.random() * 2), 10);
        if (target === 0) {
          Proxys = await getKuaiPoxy();
        } else {
          Proxys = await getXiciPoxy();
        }
      }
      Proxy = Proxys[0];
      console.log("Check " + Proxy);
      Proxys = Proxys.slice(1, Proxys.length);
    }
    return Proxy;
  }

  public hasProxy(has: boolean) {
    hasProxy = has;
  }
}
