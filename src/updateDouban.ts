import DoubanSpider from "./douban/doubanSpider";

const doubanSpider = new DoubanSpider();
// doubanSpider.start(true);
doubanSpider.partUpdate(300, 2);
// doubanSpider.updateOne(27771);