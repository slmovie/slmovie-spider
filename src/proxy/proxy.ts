/**
 * Created by 包俊 on 2018/5/15.
 */
import { getKuaiPoxy } from "./kuaiProxy";

let Proxy = "";
let Proxys: string[] = [];
let hasProxy = false;

export default class MyProxy {

  public async getProxy() {
    if (!hasProxy) {
      if (Proxys.length === 0) {
        Proxys = await getKuaiPoxy();
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
