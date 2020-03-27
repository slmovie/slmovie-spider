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
  average: string;
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
  TV = false;
  average = "";
}

export interface IDetails {
  id: string;
  detail: string[];
  name: string;
  post: string | undefined;
  describe: string;
  details: IMovieInfo;
  files: IDownloadFiles[];
  doubanID: string;
}
