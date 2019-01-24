import HomeRec from "./homeRec";
import { Save } from "./homeSave";
import { IHomeRec } from "../../typings/homeResponse";

export const startHomeSpider = (resolve: any) => {
  const homeRec = new HomeRec();
  homeRec.getRec((bean: IHomeRec) => {
    console.log("Home hmtl get");
    Save(bean).then(() => {
      resolve();
    });
  });
};

export const getMaxLength = (callback: any) => {
  const homeRec = new HomeRec();
  homeRec.getRec((bean: IHomeRec) => {
    let id = 0;
    for (let i = 0; i < bean.data.hotMovies.length; i++) {
      if (id < Number(bean.data.hotMovies[i].address)) {
        id = Number(bean.data.hotMovies[i].address);
      }
    }
    for (let i = 0; i < bean.data.newMovies.length; i++) {
      for (let x = 0; x < bean.data.newMovies[i].movies.length; x++) {
        if (id < Number(bean.data.newMovies[i].movies[x].address)) {
          id = Number(bean.data.newMovies[i].movies[x].address);
        }
      }
    }
    for (let i = 0; i < bean.data.newTVs.length; i++) {
      for (let x = 0; x < bean.data.newTVs[i].movies.length; x++) {
        if (id < Number(bean.data.newTVs[i].movies[x].address)) {
          id = Number(bean.data.newTVs[i].movies[x].address);
        }
      }
    }
    callback(id);
  });
};