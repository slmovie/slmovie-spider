"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Proxy {
    constructor(host, port) {
        this.host = host;
        this.port = port;
    }
    getProxy() {
        return this.host + ":" + this.port;
    }
}
exports.Proxy = Proxy;
