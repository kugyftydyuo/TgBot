import fs from "fs";
import {getUsers, saveUsers} from "./userService.js";
import {REFS_PATH} from "../config/paths.js";

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
            refs[users[userId].ref]++
        }
        users[userId].isSubscribed = true
        if (!users[userId].isFirstSub) {
            users[userId].isFirstSub = true
        }
    } else {
        if (users[userId].isFirstSub) {
            refs[users[userId].ref]--
            users[userId].isSubscribed = false
        }
    }

    saveRefs(refs)
    saveUsers(users)
}