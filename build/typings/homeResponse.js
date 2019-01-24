"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MoviesListItemBean {
    constructor() {
        this.movies = Array();
        this.type = "";
        this.index = 0;
    }
}
exports.MoviesListItemBean = MoviesListItemBean;
class HomeRecBean {
    constructor() {
        this.data = {
            hotMovies: Array(),
            newMovies: Array(),
            newTVs: Array()
        };
    }
}
exports.HomeRecBean = HomeRecBean;
