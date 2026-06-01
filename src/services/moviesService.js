import fs from "fs";
import {MOVIES_PATH} from "../config/paths.js";

export function getMovies() {
    return JSON.parse(fs.readFileSync(MOVIES_PATH, "utf8"));
}

export function saveMovies(movies) {
    fs.writeFileSync(MOVIES_PATH, JSON.stringify(movies, null, 2));
}

export function addMovie(movie) {
    const movies = getMovies()
    movies[movie.code] = {
        name: movie.name,
        episodes: movie.episodes,
        genre: movie.genre
    };
    saveMovies(movies)
}

export function deleteMovie(code) {
    const movies = getMovies()
    delete movies[code]
    saveMovies(movies)
}

export function editMovie(movie) {
    const movies = getMovies()
    movies[movie.code] = {
        name: !movie.name ? movies[movie.code].name : movie.name,
        episodes: !movie.episodes ? movies[movie.code].episodes : movie.episodes,
        genre: !movie.genre ? movies[movie.code].genre : movie.genre
    }
    saveMovies(movies)
}
