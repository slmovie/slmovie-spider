"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dyjySpider_1 = __importDefault(require("./dyjy/dyjySpider"));
const dyjySpider = new dyjySpider_1.default();
dyjySpider.start(false, 500);