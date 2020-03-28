"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StatusBean {
    constructor() {
        this.code = StatusBean.FAILED;
        this.error = "";
    }
}
exports.StatusBean = StatusBean;
StatusBean.SUCCESS = 1;
StatusBean.FAILED = 0;
StatusBean.FAILED_NEED_REPEAT = -1;
StatusBean.SUCCESS_EMPTY = 2;
