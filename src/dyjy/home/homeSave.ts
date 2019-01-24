/**
 * Created by 包俊 on 2017/7/20.
 */
import { getDB, getModel, getNewMoviesModelName, HotMoviesTabkleName, DBName, getNewTvsModelName } from "./homeCon";
import mongoose from "mongoose";
import { IRecMovie, HomeRecBean, IMoviesListItem } from "../../typings/homeResponse";

export const Save = (doc: HomeRecBean): Promise<void> => {
  return new Promise((resolve, reject) => {
    saveHotMovies(doc.data.hotMovies)
      .then(() => {
        console.log("Hot Movies finish");
        saveNewTVs(doc.data.newTVs).then(() => {
          console.log("New Tvs finish");
          saveNewMovies(doc.data.newMovies).then(() => {
            console.log("New Movies finish");
            resolve();
          });
        });
      });
  });
};

const saveHotMovies = (docs: IRecMovie[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    const db = getDB(DBName.HotMovies);
    const model = getModel(db, HotMoviesTabkleName);
    saveMovie(docs, model, db).then(() => resolve()).catch(error => {
      console.log("Hot Movies error " + error);
      resolve();
    });
  });
};

const saveNewMovies = (data: IMoviesListItem[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    const db = getDB(DBName.NewMovies);
    let index = 0;
    for (let i = 0; i < data.length; i++) {
      const model = getModel(db, getNewMoviesModelName(data[i].index));
      saveMovie(data[i].movies, model, db)
        .then(() => {
          index = index + 1;
          console.log("New Movies>>>>>" + getNewMoviesModelName(data[i].index) + " finish");
          if (index === data.length) {
            resolve();
          }
        }).catch(error => {
          console.log("New Movies>>>>>" + getNewMoviesModelName(data[i].index) + " error " + error);
          resolve();
        });
    }
  });
};

const saveNewTVs = (data: IMoviesListItem[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    const db = getDB(DBName.NewTvs);
    let index = 0;
    for (let i = 0; i < data.length; i++) {
      const model = getModel(db, getNewTvsModelName(data[i].index));
      saveMovie(data[i].movies, model, db)
        .then(() => {
          index = index + 1;
          console.log("New TVs>>>>>" + getNewTvsModelName(data[i].index) + " finish");
          if (index === data.length) {
            resolve();
          }
        }).catch(error => {
          console.log("New TVs>>>>>" + getNewTvsModelName(data[i].index) + " error" + error);
          resolve();
        });
    }
  });
};

const saveMovie = (docs: IRecMovie[], model: mongoose.Model<any>, db: mongoose.Connection): Promise<void> => {
  return new Promise((resolve, reject) => {
    model.remove({}, (err) => {
      if (err) {
        console.log("saveMovie>>>remove>>>" + err);
        db.close();
        reject();
      } else {
        model.create(docs, (err: any) => {
          if (err) {
            console.log("saveMovie>>>create>>>" + err);
            reject();
          } else {
            resolve();
          }
          db.close();
        });
      }
    });
  });
};
