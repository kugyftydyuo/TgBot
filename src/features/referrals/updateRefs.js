import {resetRefsKeyboard} from "../../keyboards/resetRefs.js";
import {updateAllRefsKeyboard} from "../../keyboards/updateAllRefs.js";
import {msgIsNotModifiedError} from "../../consts/strings.js";
import {countAlwaysRefs, countLastResetRefs} from "../../services/countRefsService.js";
import {emojis} from "../../config/emojis.js";

export async function updateRefs(bot, chatId, messageId, query) {
    try {
        const callData = query.data.replace("updateRefs_", "")

        bot.editMessageText(callData === "lastReset" ? `<tg-emoji emoji-id=\'${emojis.dollar }\'>❌</tg-emoji> Ваши рефки с прошлого обнуления:\n\n${countLastResetRefs()}` : `<tg-emoji emoji-id=\'${emojis.dollar }\'>❌</tg-emoji> Ваши рефки за все время:\n\n${countAlwaysRefs()}`, {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: callData === "lastReset" ? resetRefsKeyboard() : updateAllRefsKeyboard(),
            parse_mode: 'HTML'
        })

    } catch (e) {
        if (e === msgIsNotModifiedError) {
            return null
        }
    }
}