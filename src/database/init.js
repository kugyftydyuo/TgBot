import {db} from "./database.js"

db.exec(`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        ref TEXT,
        is_subscribed INTEGER NOT NULL DEFAULT 0,
        is_first_sub INTEGER NOT NULL DEFAULT 0
    );
`);

db.exec(`
    CREATE TABLE refs (
        name TEXT,
        last_reset INTEGER,
        always INTEGER
    );
`)

db.exec(`
    CREATE TABLE movies (
        code INTEGER,
        name TEXT,
        episodes INTEGER,
        genre TEXT,
        type TEXT  
    );
`)

db.exec(`
    CREATE TABLE stats (
        name TEXT,
        count INTEGER 
    );
`)

console.log("База данных успешно создана!");