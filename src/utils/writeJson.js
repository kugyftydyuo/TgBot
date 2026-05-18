import {getUsers, saveUsers} from "../services/userService.js";
import {getRefs, saveRefs, getRef} from "../services/refsService.js";

export async function handleConversion(bot, userId, checkSub) {
    const refs = getRefs()
    const users = getUsers()

    const ref = getRef(userId)

    if (!refs[ref]) {
        refs[ref] = 0;
    }

    if (checkSub.isSubscribed) {
        if (!users[userId]) {
            users[userId] = {
                isSubscribed: true,
                ref: ref,
            };
        } else if (!users[userId] || !users[userId].isSubscribed) {
            users[userId].isSubscribed = true
            refs[ref]++;
        }
    } else {
        if (users[userId]) {
            users[userId].isSubscribed = false
            refs[ref]--;
        }
    }

    saveRefs(refs)
    saveUsers(users)
}