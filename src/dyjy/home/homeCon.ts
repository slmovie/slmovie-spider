/**
 * Created by 包俊 on 2017/7/20.
 */
import mongoose from "mongoose";
import { getDBAddress } from "../../dbConstans";

export const MovieSchema = new mongoose.Schema({
  name: String,
  address: String,
  post: String,
  douban: String,
  year: String,
});

export const DBName = {
  HotMovies: "/hotMovies",
  NewMovies: "/newMovies",
  NewTvs: "/newtvs"
};

export const HotMoviesTabkleName = "hotmovie";

export const NewMoviesTableName = {
  ActionMovie: "actionmovie",
  Comedy: "comedy",
  LoveMovie: "lovemovie",
  ScienceMovie: "sciencemovie",
  HorrorMovie: "horrormovie",
  DramaMovie: "dramamovie",
  WarMovie: "warmovie",
  NewMovie: "newmovie",
};

export const getDB = (table: string): mongoose.Connection => {
  return mongoose.createConnection(getDBAddress() + table, { useNewUrlParser: true });
};

export const getModel = (db: mongoose.Connection, table: string) => {
  return db.model(table, MovieSchema);
};

export const getNewMoviesModelName = (index: number): string => {
  if (index === 1) {
    return NewMoviesTableName.ActionMovie;
  } else if (index === 2) {
    return NewMoviesTableName.Comedy;
  } else if (index === 3) {
    return NewMoviesTableName.LoveMovie;
  } else if (index === 4) {
    return NewMoviesTableName.ScienceMovie;
  } else if (index === 5) {
    return NewMoviesTableName.HorrorMovie;
  } else if (index === 6) {
    return NewMoviesTableName.DramaMovie;
  } else if (index === 7) {
    return NewMoviesTableName.WarMovie;
  } else {
    return NewMoviesTableName.NewMovie;
  }
};

export const NewTVsTableName = {
  NewTv: "newtv",
  ChinaTv: "chinatv",
  GongTaiTv: "hongtaitv",
  WestenTv: "westentv",
  JapanKoreanTv: "japankoreatv",
};

export const getNewTvsModelName = (index: number) => {
  if (index === 1) {
    return NewTVsTableName.ChinaTv;
  } else if (index === 2) {
    return NewTVsTableName.GongTaiTv;
  } else if (index === 3) {
    return NewTVsTableName.WestenTv;
  } else if (index === 4) {
    return NewTVsTableName.JapanKoreanTv;
  } else {
    return NewTVsTableName.NewTv;
  }
};