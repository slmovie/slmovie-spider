import { getKuaiPoxy } from "../../build/proxy/kuaiProxy";
import { getXiciPoxy } from "./xiciProxy";
import MyProxy from "./proxy";

// getXiciPoxy().then((proxys: string[]) => {
//   console.log(proxys);
// });

// const test = new MyProxy();
// test.getProxy();
do {
  const target = parseInt(String(Math.random() * 3), 10) + 1;
  console.log(target);
} while (false);