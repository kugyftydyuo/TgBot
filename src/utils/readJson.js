import fs from 'fs'
import {MOVIES_PATH} from "../config/paths.js"

export function getMovies() {
    return JSON.parse(fs.readFileSync(MOVIES_PATH, "utf-8"))
}