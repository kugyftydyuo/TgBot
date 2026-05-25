import fs from "fs";
import {MOVIES_PATH} from "../config/paths.js";

export function getMovies() {
    return JSON.parse(fs.readFileSync(MOVIES_PATH, "utf8"));
}

export function saveMovies(movies) {
    fs.writeFileSync(MOVIES_PATH, JSON.stringify(movies, null, 2));
}

export function addMovie(code, name) {
    const movies = getMovies()
    movies[code] = name;
    saveMovies(movies)
}

export function deleteMovie(code) {
    const movies = getMovies()
    delete movies[code]
    saveMovies(movies)
}

export function editMovie(code, newName) {
    const movies = getMovies()
    movies[code] = newName
    saveMovies(movies)
}