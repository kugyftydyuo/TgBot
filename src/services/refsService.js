import {getUser, updateUser} from "./userService.js";
import {getSession} from "../state/sessionAddBot.js";
import {db} from "../database/database.js";

export function getRefs() {
    return db.prepare(`
        SELECT * FROM refs;
    `).all()
}

export function getRef(name) {
    const ref = db.prepare(`
        SELECT *
        FROM refs
        WHERE name = ?
    `).get(name)

    return {
        name: ref.name,
        last_reset: ref.last_reset,
        always: ref.always
    }
}

export function updateRef(ref) {
    db.prepare(`
        UPDATE refs
        SET
            name = ?,
            last_reset = ?,
            always = ?
        WHERE name = ?
    `).run(
        ref.name,
        ref.last_reset,
        ref.always,
        ref.name
    )
}

export function editRef(userId, checkSub) {
    const user = getUser(userId)
    const ref = getRef(user.ref)
    
    if (checkSub.isSubscribed) {
        if (!user.is_subscribed) {
            updateRef({name: user.ref, last_reset: ref.last_reset + 1, always: ref.always})
        }
        updateUser({ref: user.ref, is_subscribed: true, is_first_sub: user.is_first_sub, id: userId})
        if (!user.is_first_sub) {
            updateUser({ref: user.ref, is_subscribed: true, is_first_sub: true, id: userId})
        }
    } else {
        if (user.is_first_sub) {
            updateRef({name: user.ref, last_reset: ref.last_reset - 1, always: ref.always})
            updateUser({ref: user.ref, is_subscribed: false, is_first_sub: user.is_first_sub, id: userId})
        }
    }
}

export function resetRefs(query) {
    if (query.includes("page")) return

    const refs = getRefs()

    refs.map(ref => {
        updateRef({name: ref.name, last_reset: 0, always: ref.always + ref.last_reset})
    })
}