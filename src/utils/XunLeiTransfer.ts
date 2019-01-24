/**
 * Created by 包俊 on 2018/5/28.
 */
import iconv from "iconv-lite";

export const transfer = (xl: string) => {
  if (xl.indexOf("thunder://") !== -1) {
    let origin = xl.replace("thunder://", "");
    let buffer = Buffer.from(origin, "base64");
    let url = iconv.decode(buffer, "gbk");
    url = url.slice(2, url.length - 2);
    if (url.indexOf("电影家园www.idyjy.com下载") !== -1) {
      url = url.replace("电影家园www.idyjy.com", "双龙影视www.slys.in");
    }
    return url;
  } else {
    return xl;
  }
};
