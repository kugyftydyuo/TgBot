import {admins, workers} from "../../config/workers.js";
import {getRef} from "../../services/refsService.js";
import {workersIds} from "../../config/parallels.js";
import {lookStatsKeyboard} from "../../keyboards/lookStats.js";
import {getAddBotSession} from "../../state/addBotSession.js";
import {emojis} from "../../config/emojis.js";

export function statsHandler(bot, userId, chatId) {
    if (admins.includes(userId)) {
        const session = getAddBotSession(userId)
        session.state = "LOOK_STATS"

        return bot.sendMessage(chatId, `<tg-emoji emoji-id=\'${emojis.question2 }\'>👍</tg-emoji> Что хочешь посмотреть?`, {
            reply_markup: lookStatsKeyboard(),
            parse_mode: 'HTML'
        })
    } else if (workers.includes(userId.toString())) {
        const ref = getRef(workersIds[userId])

        return bot.sendMessage(chatId, `${ref.name}: 👤${ref.last_reset}`)
    } else {
        return bot.sendMessage(chatId, `<tg-emoji emoji-id=\'${emojis.angry }\'>👍</tg-emoji> Нет доступа`, {parse_mode: 'HTML'})
    }
}