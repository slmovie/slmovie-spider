"use strict";
exports.__esModule = true;
var MoviesListItemBean = /** @class */ (function () {
    function MoviesListItemBean() {
        this.movies = Array();
        this.type = "";
        this.index = 0;
    }
    return MoviesListItemBean;
}());
exports.MoviesListItemBean = MoviesListItemBean;
var HomeRecBean = /** @class */ (function () {
    function HomeRecBean() {
        this.data = {
            hotMovies: Array(),
            newMovies: Array(),
            newTVs: Array()
        };
    }
    return HomeRecBean;
}());
exports.HomeRecBean = HomeRecBean;
