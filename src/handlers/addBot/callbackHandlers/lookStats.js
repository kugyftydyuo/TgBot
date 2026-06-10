import {getRefs} from "../../../services/refsService.js";
import {userIds} from "../../../config/parallels.js";
import {getSession} from "../../../state/sessionAddBot.js";

export async function lookStats(bot, chatId, userId, messageId, query) {
    const refs = getRefs()
    const session = getSession(userId)

    session.state = null
    if (query.data === "look_stats_my") {
        await bot.deleteMessage(chatId, messageId)
        return bot.sendMessage(chatId, `👨‍💼- ${refs[userIds[userId]]} чел\n💰 - ${refs[userIds[userId]] * 6}₽`)
    }
    if (query.data === "look_stats_all") {
        let message = ``
        const keys = Object.keys(refs)
        const values = Object.values(refs)

        for (let i = 0; i < keys.length; i++) {
            message += `${keys[i]}: ${values[i]}\n`
        }
        await bot.deleteMessage(chatId, messageId)
        return bot.sendMessage(chatId, message)
    }
}