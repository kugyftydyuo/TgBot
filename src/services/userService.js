import {db} from "../database/database.js";

export function getUsers() {
    return db.prepare(`
        SELECT * FROM users;
    `).all()
}

export function getUser(userId, ref) {
    const user = db.prepare(`
        SELECT *
        FROM users
        WHERE id = ?
    `).get(userId);

    if (!user) {
        const name = !ref ? "tryhard" : ref
        db.prepare(`
            INSERT INTO users (
                id,
                ref,
                is_subscribed,
                is_first_sub
            )
            VALUES (?, ?, 0, 0)
        `).run(userId, name);

        return {
            name: name,
            is_subscribed: false,
            is_first_sub: false
        };
    }

    return {
        ref: user.ref,
        is_subscribed: Boolean(user.is_subscribed),
        is_first_sub: Boolean(user.is_first_sub)
    };
}

export function updateUser(user) {
    db.prepare(`
        UPDATE users
        SET
            ref = ?,
            is_subscribed = ?,
            is_first_sub = ?
        WHERE id = ?
    `).run(
        user.ref,
        user.is_subscribed ? 1 : 0,
        user.is_first_sub ? 1 : 0,
        user.id
    );
}

export function getUserBids(userId) {
    const userBids = db.prepare(`
        SELECT * FROM bids WHERE id = ?
    `).get(userId)

    if (!userBids) {
        db.prepare(`
            INSERT INTO bids (
                id,
                smotrim
            )
            VALUES (?, ?)
        `).run(userId, 1);

        return {
            id: userId,
            smotrim: 1
        }
    }

    return {
        id: userBids
    }
}