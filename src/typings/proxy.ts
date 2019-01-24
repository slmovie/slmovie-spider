export class Proxy {
  host: string;
  port: string | undefined;
  constructor(host: string, port: string | undefined) {
    this.host = host;
    this.port = port;
  }
  getProxy() {
    return this.host + ":" + this.port;
  }
}