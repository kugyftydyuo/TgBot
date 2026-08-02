import fs from "fs";
import {getUsers, saveUsers} from "./userService.js";
import {REFS_PATH} from "../config/paths.js";
import {getSession} from "../state/sessionAddBot.js";

export function getRefs() {
    return JSON.parse(fs.readFileSync(REFS_PATH, "utf-8"));
}

export function saveRefs(refs) {
    fs.writeFileSync(REFS_PATH, JSON.stringify(refs, null, 2));
}

export function editRef(bot, userId, checkSub) {
    const refs = getRefs()
    const users = getUsers()

    if (checkSub.isSubscribed) {
        if (!users[userId].isSubscribed) {
            refs[users[userId].ref].lastReset++
        }
        users[userId].isSubscribed = true
        if (!users[userId].isFirstSub) {
            users[userId].isFirstSub = true
        }
    } else {
        if (users[userId].isFirstSub) {
            refs[users[userId].ref].lastReset--
            users[userId].isSubscribed = false
        }
    }

    saveRefs(refs)
    saveUsers(users)
}

export function resetRefs(userId, query) {
    if (query.includes("page")) return

    const refs = getRefs()
    const session = getSession(userId)

    Object.entries(refs).map(ref => {
        refs[ref[1].name].always += refs[ref[1].name].lastReset
        refs[ref[1].name].lastReset = 0
    })

    session.state = null
    saveRefs(refs)
}