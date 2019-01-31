"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by 包俊 on 2017/7/20.
 */
const homeCon_1 = require("./homeCon");
exports.Save = (doc) => {
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
const saveHotMovies = (docs) => {
    return new Promise((resolve, reject) => {
        const db = homeCon_1.getDB(homeCon_1.DBName.HotMovies);
        db.on("error", (error) => {
            console.log(error);
            process.exit(0);
        });
        const model = homeCon_1.getModel(db, homeCon_1.HotMoviesTabkleName);
        saveMovie(docs, model, db).then(() => resolve()).catch(error => {
            console.log("Hot Movies error " + error);
            resolve();
        });
    });
};
const saveNewMovies = (data) => {
    return new Promise((resolve, reject) => {
        const db = homeCon_1.getDB(homeCon_1.DBName.NewMovies);
        db.on("error", (error) => {
            console.log(error);
            process.exit(0);
        });
        let index = 0;
        for (let i = 0; i < data.length; i++) {
            const model = homeCon_1.getModel(db, homeCon_1.getNewMoviesModelName(data[i].index));
            saveMovie(data[i].movies, model, db)
                .then(() => {
                index = index + 1;
                console.log("New Movies>>>>>" + homeCon_1.getNewMoviesModelName(data[i].index) + " finish");
                if (index === data.length) {
                    resolve();
                }
            }).catch(error => {
                console.log("New Movies>>>>>" + homeCon_1.getNewMoviesModelName(data[i].index) + " error " + error);
                resolve();
            });
        }
    });
};
const saveNewTVs = (data) => {
    return new Promise((resolve, reject) => {
        const db = homeCon_1.getDB(homeCon_1.DBName.NewTvs);
        db.on("error", (error) => {
            console.log(error);
            process.exit(0);
        });
        let index = 0;
        for (let i = 0; i < data.length; i++) {
            const model = homeCon_1.getModel(db, homeCon_1.getNewTvsModelName(data[i].index));
            saveMovie(data[i].movies, model, db)
                .then(() => {
                index = index + 1;
                console.log("New TVs>>>>>" + homeCon_1.getNewTvsModelName(data[i].index) + " finish");
                if (index === data.length) {
                    resolve();
                }
            }).catch(error => {
                console.log("New TVs>>>>>" + homeCon_1.getNewTvsModelName(data[i].index) + " error" + error);
                resolve();
            });
        }
    });
};
const saveMovie = (docs, model, db) => {
    return new Promise((resolve, reject) => {
        model.remove({}, (err) => {
            if (err) {
                console.log("saveMovie>>>remove>>>" + err);
                reject();
            }
            else {
                model.create(docs, (err) => {
                    if (err) {
                        console.log("saveMovie>>>create>>>" + err);
                        reject();
                    }
                    else {
                        resolve();
                    }
                });
            }
        });
    });
};
