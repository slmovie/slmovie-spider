"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const doubanSpider_1 = __importDefault(require("./douban/doubanSpider"));
const doubanSpider = new doubanSpider_1.default();
// doubanSpider.start(true);
doubanSpider.partUpdate(27521);
