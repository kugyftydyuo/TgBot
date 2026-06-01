import fs from "fs";
import {STATS_PATH} from "../config/paths.js";

export function saveStats(stat) {
    const data = JSON.parse(fs.readFileSync(STATS_PATH, "utf8"));
    data[stat]++
    fs.writeFileSync(STATS_PATH, JSON.stringify(data, null, 2));
}