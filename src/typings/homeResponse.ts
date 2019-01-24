
export interface IRecMovie {
  name: string;
  address: string;
  post: string;
  douban: string;
  year: string;
  from: string;
}


export interface IMoviesListItem {
  movies: IRecMovie[];
  type: string;
  index: number;
}

export class MoviesListItemBean implements IMoviesListItem {
  movies = Array<IRecMovie>();
  type: string = "";
  index: number = 0;
}


export interface IHomeRec {
  data: {
    hotMovies: IRecMovie[];
    newMovies: IMoviesListItem[];
    newTVs: IMoviesListItem[];
  };
}

export class HomeRecBean implements IHomeRec {
  data = {
    hotMovies: Array<IRecMovie>(),
    newMovies: Array<MoviesListItemBean>(),
    newTVs: Array<MoviesListItemBean>()
  }
}