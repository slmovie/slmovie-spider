"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by 包俊 on 2017/7/20.
 */
const homeCon_1 = require("./homeCon");
const LogUtils_1 = require("../../utils/LogUtils");
exports.Save = (doc) => {
    return new Promise((resolve, reject) => {
        saveHotMovies(doc.data.hotMovies)
            .then(() => {
            LogUtils_1.log("Hot Movies finish");
            saveNewTVs(doc.data.newTVs).then(() => {
                LogUtils_1.log("New Tvs finish");
                saveNewMovies(doc.data.newMovies).then(() => {
                    LogUtils_1.log("New Movies finish");
                    resolve();
                });
            });
        });
    });
};
const saveHotMovies = (docs) => {
    return new Promise((resolve, reject) => {
        const db = homeCon_1.getDB(homeCon_1.DBName.HotMovies);
        db.on("error", (error) => {
            LogUtils_1.log(error);
            process.exit(0);
        });
        const model = homeCon_1.getModel(db, homeCon_1.HotMoviesTabkleName);
        saveMovie(docs, model, db).then(() => resolve()).catch(error => {
            LogUtils_1.log("Hot Movies error " + error);
            resolve();
        });
    });
};
const saveNewMovies = (data) => {
    return new Promise((resolve, reject) => {
        const db = homeCon_1.getDB(homeCon_1.DBName.NewMovies);
        db.on("error", (error) => {
            LogUtils_1.log(error);
            process.exit(0);
        });
        let index = 0;
        for (let i = 0; i < data.length; i++) {
            const model = homeCon_1.getModel(db, homeCon_1.getNewMoviesModelName(data[i].index));
            saveMovie(data[i].movies, model, db)
                .then(() => {
                index = index + 1;
                // log("New Movies>>>>>" + getNewMoviesModelName(data[i].index) + " finish");
                if (index === data.length) {
                    resolve();
                }
            }).catch(error => {
                LogUtils_1.log("New Movies>>>>>" + homeCon_1.getNewMoviesModelName(data[i].index) + " error " + error);
                resolve();
            });
        }
    });
};
const saveNewTVs = (data) => {
    return new Promise((resolve, reject) => {
        const db = homeCon_1.getDB(homeCon_1.DBName.NewTvs);
        db.on("error", (error) => {
            LogUtils_1.log(error);
            process.exit(0);
        });
        let index = 0;
        for (let i = 0; i < data.length; i++) {
            const model = homeCon_1.getModel(db, homeCon_1.getNewTvsModelName(data[i].index));
            saveMovie(data[i].movies, model, db)
                .then(() => {
                index = index + 1;
                // log("New TVs>>>>>" + getNewTvsModelName(data[i].index) + " finish");
                if (index === data.length) {
                    resolve();
                }
            }).catch(error => {
                LogUtils_1.log("New TVs>>>>>" + homeCon_1.getNewTvsModelName(data[i].index) + " error" + error);
                resolve();
            });
        }
    });
};
const saveMovie = (docs, model, db) => {
    return new Promise((resolve, reject) => {
        model.deleteMany({}, (err) => {
            if (err) {
                LogUtils_1.log("saveMovie>>>remove>>>" + err);
                reject();
            }
            else {
                model.create(docs, (err) => {
                    if (err) {
                        LogUtils_1.log("saveMovie>>>create>>>" + err);
                        reject();
                    }
                    else {
                        resolve();
                    }
                    db.close();
                });
            }
        });
    });
};
