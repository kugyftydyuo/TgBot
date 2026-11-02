import {resetRefs} from "../../services/refsService.js";
import {resetRefsKeyboard} from "../../keyboards/resetRefs.js";
import {msgIsNotModifiedError} from "../../consts/strings.js";
import {countLastResetRefs} from "../../services/countRefsService.js";
import {emojis} from "../../config/emojis.js";

export function confirmResetRefs(bot, query) {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const isConfirm = query.data.replace("reset_refs_", "")

    if (isConfirm === "yes") {
        resetRefs(query.data)
    }

    try {
        bot.editMessageText(`<tg-emoji emoji-id=\'${emojis.dollar}\'>❌</tg-emoji> Ваши рефки с прошлого обнуления:\n\n${countLastResetRefs()}`, {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: resetRefsKeyboard(),
            parse_mode: 'HTML'
        })
    } catch (e) {
        if (e === msgIsNotModifiedError) {
            return null
        }
    }
}