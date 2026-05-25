import {workers} from "../../config/workers.js";
import {getRefs} from "../../services/refsService.js";
import {parallels} from "../../config/parallels.js";

export function statsHandler(bot, userId, chatId) {
    if (workers.includes(userId)) {
        const refs = getRefs()
        return bot.sendMessage(chatId, `👨‍💼- ${refs[parallels[userId]]} чел\n💰 - ${refs[parallels[userId]] * 6}₽`)
    } else {
        return bot.sendMessage(chatId, "❌ Нет доступа")
    }
}