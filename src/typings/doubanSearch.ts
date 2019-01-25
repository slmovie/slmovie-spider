export interface IDoubanSearch {
  subjects: IDoubanSubject[];
  count: number;
  start: number;
  total: number;
  title: string;
}

export interface IDoubanSubject {
  rating: {
    average: string;
    max: string;
    starts: string;
    min: string;
  };
  genres: string[];
  title: string;
  casts: IDoubanCastAndDirector[];
  collect_count: number;
  subtype: string;
  directors: IDoubanCastAndDirector[];
  year: string;
  images: {
    small: string;
    large: string;
    medium: string;
  };
  alt: string;
  id: string;
}

export interface IDoubanCastAndDirector {
  alt: string;
  name: string;
  id: string;
  avatars: {
    small: string;
    large: string;
    medium: string;
  };
}