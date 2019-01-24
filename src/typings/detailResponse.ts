export interface IDownloadFiles {
  name: string;
  download: string;
  fileSize: string;
}

export interface IMovieInfo {
  name: string;
  year: string;
  location: string;
  type: string;
  actor: string;
  director: string;
  otherName: string;
  IMDB: string;
  status: string;
  TV: boolean;
}

export class MovieInfo implements IMovieInfo {
  name: string = "";
  year: string = "";
  location: string = "";
  type: string = "";
  actor: string = "";
  director: string = "";
  otherName: string = "";
  IMDB: string = "";
  status: string = "";
  TV = false
}

export interface IDetails {
  id: string;
  detail: string[];
  name: string;
  post: string;
  describe: string;
  details: IMovieInfo;
  files: IDownloadFiles[];
}
