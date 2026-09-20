import {getRef} from "../../services/refsService.js";
import {workersIds} from "../../config/parallels.js";
import {getAddBotSession} from "../../state/addBotSession.js";
import {resetRefsKeyboard} from "../../keyboards/resetRefs.js";
import {updateAllRefsKeyboard} from "../../keyboards/updateAllRefs.js";
import {countAlwaysRefs, countLastResetRefs} from "../../services/countRefsService.js";

export async function lookStats(bot, query) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const session = getAddBotSession(userId)

    if (query.data === "look_stats_my") {
        const ref = getRef(workersIds[userId])
        session.state = null
        await bot.editMessageText(`👨‍💼- ${ref.last_reset} чел`, {
            chat_id: chatId,
            message_id: messageId
        })
    }
    if (query.data === "look_stats_all") {
        session.state = "LOOK_REFS"

        await bot.sendMessage(chatId, `💸Ваши рефки с прошлого обнуления:\n\n${countLastResetRefs()}`, {
            reply_markup: resetRefsKeyboard()
        })
        await bot.sendMessage(chatId, `💸Ваши рефки за все время:\n\n${countAlwaysRefs()}`, {
            reply_markup: updateAllRefsKeyboard()
        })
        await bot.deleteMessage(chatId, messageId)
    }
}