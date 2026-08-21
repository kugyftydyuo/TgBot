import {db} from "../../database/database.js";

export async function chatJoinRequestHandler(userId, linkName) {
    const userBids = db.prepare(`
        SELECT * FROM bids WHERE id = ?
    `).get(userId)

    if (linkName === 'агли' && !userBids) {
        db.prepare(`
            INSERT INTO bids (
                id,
                smotrim
            )
            VALUES (?, 1)
        `).run(userId)
    }
}