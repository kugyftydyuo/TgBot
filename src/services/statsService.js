import {workers} from "../config/workers.js";
import {db} from "../database/database.js";

function getStat(stat) {
    return db.prepare(`
        SELECT * FROM stats WHERE name = ?
    `).get(stat)
}

export function saveStats(stat, userId) {
    if (workers.includes(userId)) return
    const stats = getStat(stat)

    db.prepare(`
        UPDATE stats
        SET
            name = ?,
            count = ?
        WHERE name = ?
    `).run(stat, stats.count + 1, stat)
}