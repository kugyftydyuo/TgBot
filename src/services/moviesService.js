import {db} from "../database/database.js";

export function getMovie(code) {
    return db.prepare(`
        SELECT * FROM movies WHERE code = ?
    `).get(code)
}

export function getMovies() {
    return db.prepare(`
        SELECT * FROM movies
    `).all()
}

export function addMovie(movie) {
    db.prepare(`
        INSERT INTO movies (
            code,
            name,
            episodes,
            genre,
            type
        )
        VALUES (?, ?, ?, ?, ?)
    `).run(movie.code, movie.name, movie.episodes, movie.genre, movie.type)
}

export function deleteMovie(code) {
    db.prepare(`
        DELETE FROM movies
        WHERE code = ?
    `).run(code)
}

export function editMovie(movieToEdit) {
    const movie = getMovie(movieToEdit.code)

    db.prepare(`
        UPDATE movies
        SET 
            name = ?,
            episodes = ?,
            genre = ?,
            type = ?
        WHERE code = ?
    `).run(
        !movieToEdit.name ? movie.name : movieToEdit.name,
        !movieToEdit.episodes ? movie.episodes : movieToEdit.episodes,
        !movieToEdit.genre ? movie.genre : movieToEdit.genre,
        !movieToEdit.type ? movie.type : movieToEdit.type,
        movieToEdit.code
    )
}
