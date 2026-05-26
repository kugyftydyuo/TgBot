import fs from 'fs'
import {USERS_PATH} from "../config/paths.js";

function getUsers() {
    return JSON.parse(fs.readFileSync(USERS_PATH, 'utf-8'))
}

function saveUsers(users) {
    fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2))
}

function getUser(userId, ref) {
    const users = getUsers()

    if (!users[userId]) {
        users[userId] = {
            ref: ref,
            isSubscribed: false,
            isFirstSub: false
        }
        saveUsers(users)
    }
    return users[userId]
}

export {
    getUsers,
    saveUsers,
    getUser
}