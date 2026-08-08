import {MOVIES_PATH, REFS_PATH, STATS_PATH, USERS_PATH} from "../config/paths.js";
import fs from "fs"
import {db} from "./database.js"

const users = JSON.parse(fs.readFileSync(USERS_PATH, "utf8"));

const insertUser = db.prepare(`
    INSERT INTO users (
        id,
        ref,
        is_subscribed,
        is_first_sub
    )
    VALUES (?, ?, ?, ?)
`);

const insertManyUsers = db.transaction(() => {
    for (const [id, user] of Object.entries(users)) {
        insertUser.run(
            Number(id),
            user.ref ?? null,
            user.isSubscribed ? 1 : 0,
            user.isFirstSub ? 1 : 0
        );
    }
});

insertManyUsers();

console.log(`Перенесено ${Object.keys(users).length} пользователей.`);

const refs = JSON.parse(fs.readFileSync(REFS_PATH, "utf8"));

const insertRefs = db.prepare(`
    INSERT INTO refs (
        name,
        last_reset,
        always
    )
    VALUES (?, ?, ?)
`);

const insertManyRefs = db.transaction(() => {
    for (const [name, ref] of Object.entries(refs)) {
        insertRefs.run(
            ref.name,
            ref.lastReset,
            ref.always
        );
    }
});

insertManyRefs();

console.log(`refki pereneseni`);

const movies = JSON.parse(fs.readFileSync(MOVIES_PATH, "utf8"));

const insertMovies = db.prepare(`
    INSERT INTO movies (
        code,
        name,
        episodes,
        genre,
        type
    )
    VALUES (?, ?, ?, ?, ?)
`);

const insertManyMovies = db.transaction(() => {
    for (const [code, movie] of Object.entries(movies)) {
        insertMovies.run(
            Number(code),
            movie.name,
            movie.episodes,
            movie.genre,
            movie.type
        );
    }
});

insertManyMovies();

console.log(`anime pereneseni`);

const stats = JSON.parse(fs.readFileSync(STATS_PATH, "utf8"));

const insertStats = db.prepare(`
    INSERT INTO stats (
        name,
        count
    )
    VALUES (?, ?)
`);

const insertManyStats = db.transaction(() => {
    for (const stat of Object.entries(stats)) {
        insertStats.run(
            stat[0],
            stat[1]
        );
    }
});

insertManyStats();

console.log(`stats pereneseni`);