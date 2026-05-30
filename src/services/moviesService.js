import fs from "fs";
import {MOVIES_PATH} from "../config/paths.js";

export function getMovies() {
    return JSON.parse(fs.readFileSync(MOVIES_PATH, "utf8"));
}

export function saveMovies(movies) {
    fs.writeFileSync(MOVIES_PATH, JSON.stringify(movies, null, 2));
}

export function addMovie(movie, genre) {
    const movies = getMovies()
    movies[movie.code] = {
        name: movie.name,
        series: movie.series,
        genre: genre
    };
    saveMovies(movies)
}

export function deleteMovie(code) {
    const movies = getMovies()
    delete movies[code]
    saveMovies(movies)
}

export function editMovie(movie, genre) {
    const movies = getMovies()
    movies[movie.code] = {
        name: movie.name,
        series: movie.series,
        genre: genre
    }
    saveMovies(movies)
}

let movieState = {}

export function addMovieState(userId, name, series, code, type) {
    movieState[userId] = {
        type: type,
        name: name,
        series: series,
        code: code
    }
}

export function getMovieState(userId) {
    return movieState[userId]
}