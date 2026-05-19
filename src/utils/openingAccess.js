import {getUsers, saveUsers} from "../services/userService.js";
import {getRefs, saveRefs, getRef} from "../services/refsService.js";

export async function openAccess(bot, userId, checkSub) {
    const refs = getRefs()
    const users = getUsers()

    const ref = getRef(userId)

    if (!refs[ref]) {
        refs[ref] = 0;
    }

    if (checkSub.isSubscribed) {
        users[userId] = {
            ref: ref,
            isSubscribed: true
        }
        if (!users[userId].isSubscribed) {
            refs[ref]++
        }
    } else {
        if (users[userId]) {
            refs[ref]--
            users[userId] = {
                ref: ref,
                isSubscribed: false
            }
        }
    }

    saveRefs(refs)
    saveUsers(users)
}