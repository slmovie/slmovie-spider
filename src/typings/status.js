"use strict";
exports.__esModule = true;
var StatusBean = /** @class */ (function () {
    function StatusBean() {
        this.code = StatusBean.FAILED;
        this.error = "";
    }
    StatusBean.SUCCESS = 1;
    StatusBean.FAILED = 0;
    StatusBean.FAILED_NEED_REPEAT = -1;
    StatusBean.SUCCESS_EMPTY = 2;
    return StatusBean;
}());
exports.StatusBean = StatusBean;
