"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by 包俊 on 2018/5/15.
 */
const kuaiProxy_1 = require("./kuaiProxy");
const xiciProxy_1 = require("./xiciProxy");
let Proxy = "";
let Proxys = [];
let hasProxy = false;
class MyProxy {
    getProxy() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!hasProxy) {
                if (Proxys.length === 0) {
                    const target = parseInt(String(Math.random() * 2), 10);
                    if (target === 0) {
                        Proxys = yield kuaiProxy_1.getKuaiPoxy();
                    }
                    else {
                        Proxys = yield xiciProxy_1.getXiciPoxy();
                    }
                }
                Proxy = Proxys[0];
                Proxys = Proxys.slice(1, Proxys.length);
            }
            return Proxy;
        });
    }
    hasProxy(has) {
        hasProxy = has;
    }
}
exports.default = MyProxy;
