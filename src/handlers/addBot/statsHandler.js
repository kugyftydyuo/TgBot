import {workers} from "../../config/workers.js";
import {getRefs} from "../../services/refsService.js";
import {userIds} from "../../config/parallels.js";

export function statsHandler(bot, userId, chatId) {
    if (workers.includes(userId)) {
        const refs = getRefs()
        return bot.sendMessage(chatId, `👨‍💼- ${refs[userIds[userId]]} чел\n💰 - ${refs[userIds[userId]] * 6}₽`)
    } else {
        return bot.sendMessage(chatId, "❌ Нет доступа")
    }
}