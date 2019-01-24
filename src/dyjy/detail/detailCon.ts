import mongoose from "mongoose";
import { getDBAddress } from "../../dbConstans";

/**
 * Created by 包俊 on 2017/3/27.
 */

const movieFiles = new mongoose.Schema({
  name: String,
  download: String,
  fileSize: String,
});

const details = new mongoose.Schema({
  name: String,
  year: String,
  location: String,
  type: String,
  actor: String,
  director: String,
  otherName: String,
  IMDB: String,
  status: String,
  TV: Boolean,
  average: String,
});

const MovieSchema = new mongoose.Schema({
  name: String,
  post: String,
  describe: String,
  detail: [String],
  details: details,
  files: [movieFiles],
  id: String,
  doubanID: String,
});

export const MoviesDB = () => {
  return mongoose.createConnection(getDBAddress() + "/movies", { useNewUrlParser: true });
};

export const MovieModel = (db: mongoose.Connection) => {
  return db.model("Movie", MovieSchema);
};