import {admins, workers} from "../../config/workers.js";
import {getRef} from "../../services/refsService.js";
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
        const ref = getRef(userIds[userId])
        return bot.sendMessage(chatId, `${ref.name}: 👤${ref.last_reset}\n💰${ref.last_reset * 6}р`)
    } else {
        return bot.sendMessage(chatId, "❌ Нет доступа")
    }
}