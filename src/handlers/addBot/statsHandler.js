import {admins, workers} from "../../config/workers.js";
import {getRefs} from "../../services/refsService.js";
import {userIds} from "../../config/parallels.js";
import {lookStatsKeyboard} from "../../utils/keyboards.js";
import {getSession} from "../../state/sessionAddBot.js";

export function statsHandler(bot, userId, chatId) {
    if (admins.includes(userId)) {
        const session = getSession(userId)
        session.state = "LOOK_STATS"
        return bot.sendMessage(chatId, '❓ Что хочешь посмотреть?', {
            reply_markup: lookStatsKeyboard()
        })
    } else if (workers.includes(userId)) {
        const refs = getRefs()
        return bot.sendMessage(chatId, `👨‍💼- ${refs[userIds[userId]]} чел\n💰 - ${refs[userIds[userId]] * 6}₽`)
    } else {
        return bot.sendMessage(chatId, "❌ Нет доступа")
    }
}