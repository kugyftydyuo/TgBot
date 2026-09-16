import {admins, workers} from "../../config/workers.js";
import {getRef} from "../../services/refsService.js";
import {workersIds} from "../../config/parallels.js";
import {lookStatsKeyboard} from "../../keyboards/lookStats.js";
import {getAddBotSession} from "../../state/addBotSession.js";

export function statsHandler(bot, userId, chatId) {
    if (admins.includes(userId)) {
        const session = getAddBotSession(userId)
        session.state = "LOOK_STATS"
        return bot.sendMessage(chatId, '❓ Что хочешь посмотреть?', {
            reply_markup: lookStatsKeyboard()
        })
    } else if (workers.includes(userId)) {
        const ref = getRef(workersIds[userId])
        return bot.sendMessage(chatId, `${ref.name}: 👤${ref.last_reset}`)
    } else {
        return bot.sendMessage(chatId, "❌ Нет доступа")
    }
}