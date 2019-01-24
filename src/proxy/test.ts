import MyProxy from "./proxy";

const test = new MyProxy();
for (let i = 0; i < 50; i++) {
  test.getProxy();
}