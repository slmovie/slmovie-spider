import { HomeRecBean, IHomeRec, IRecMovie, MoviesListItemBean } from "../../typings/homeResponse";
import cheerio from "cheerio";
import MyProxy from "../../proxy/proxy";
import request from "request";
import iconv from "iconv-lite";

export default class HomeRec {
  public async getRec(callback: any) {
    const myProxy = new MyProxy();
    const proxy = await myProxy.getProxy();
    this.reqHtml(proxy, (result: IHomeRec) => {
      myProxy.hasProxy(true);
      callback(result);
    }, (error: any) => {
      myProxy.hasProxy(false);
      this.getRec(callback);
    });
  }

  private reqHtml(proxy: string, resolve: any, reject: any) {
    const myReq = request.defaults({ "proxy": proxy });
    myReq.get("http://www.idyjy.com",
      { encoding: "binary", timeout: 1000 },
      (error, response, res) => {
        if (error) {
          reject(error);
        } else {
          if (response.statusCode === 200) {
            const body = iconv.decode(Buffer.from(res, "binary"), "gbk");
            const result = new HomeRecBean();
            result.data.hotMovies = this.getHotMovie(body);
            result.data.newTVs = this.getNewTVs(body);
            result.data.newMovies = this.getNewMovies(body);
            if (result.data.hotMovies.length !== 0 && result.data.newTVs.length !== 0 && result.data.newMovies.length !== 0) {
              resolve(result);
            } else {
              reject("Error");
            }
          } else {
            reject(response.statusCode);
          }
        }
      });
  }

  private getHotMovie = (html: string) => {
    let $ = cheerio.load(html);
    let movies: IRecMovie[] = [];
    $(".play-img", ".moxhotcoment").each((i, elem) => {
      let movie = this.getMovie($, elem);
      movies.push(movie);
    });
    return movies;
  }

  private getNewMovies = (html: string) => {
    let $ = cheerio.load(html);
    let result = [];
    for (let i = 0; i < 8; i++) {
      let typeMovies = new MoviesListItemBean();
      let movies: IRecMovie[] = [];
      $(".play-img", $(".img-list", $(".box")[0])[i]).each((i, elem) => {
        let movie = this.getMovie($, elem);
        movies.push(movie);
      });
      typeMovies.index = i;
      typeMovies.movies = movies;
      typeMovies.type = this.newMoviesType(i);
      result.push(typeMovies);
    }
    return result;
  }

  private getNewTVs = (html: string) => {
    let $ = cheerio.load(html);
    let result = [];
    for (let i = 0; i < 5; i++) {
      let typeMovies = new MoviesListItemBean();
      let movies: IRecMovie[] = [];
      $(".play-img", $(".img-list", $(".box")[1])[i]).each((i, elem) => {
        let movie = this.getMovie($, elem);
        movies.push(movie);
      });
      typeMovies.index = i;
      typeMovies.movies = movies;
      typeMovies.type = this.newTVsType(i);
      result.push(typeMovies);
    }
    return result;
  }

  private getMovie = ($: CheerioStatic, elem: CheerioElement): IRecMovie => {
    const address = this.getMovidId($, elem);
    return {
      "name": $(elem).attr("title"),
      //网页地址
      "address": address,
      //海报图片
      "post": $("img", elem).attr("original"),
      //豆瓣评分
      "douban": $("info", $(".pRightBottom", elem)).text(),
      //上映日期
      "year": $("info", $(".pLeftTop", elem)[0]).text(),
      "from": "dyjy",
    };
  }

  private getMovidId = ($: CheerioStatic, elem: CheerioElement): string => {
    let address = $(elem).attr("href");
    let split = address.split("/");
    address = split[split.length - 1].split(".")[0];
    return address;
  }

  private newTVsType = (index: number): string => {
    if (index === 1) {
      return "国产剧";
    } else if (index === 2) {
      return "港台剧";
    } else if (index === 3) {
      return "欧美剧";
    } else if (index === 4) {
      return "日韩剧";
    } else {
      return "最近更新";
    }
  }

  private newMoviesType = (index: number): string => {
    if (index === 1) {
      return "动作片";
    } else if (index === 2) {
      return "喜剧片";
    } else if (index === 3) {
      return "爱情片";
    } else if (index === 4) {
      return "科幻片";
    } else if (index === 5) {
      return "恐怖片";
    } else if (index === 6) {
      return "剧情片";
    } else if (index === 7) {
      return "战争片";
    } else {
      return "最近更新";
    }
  }
}
