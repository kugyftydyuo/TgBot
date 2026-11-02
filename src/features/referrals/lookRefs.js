import {confirmResetRefsKeyboard} from "../../keyboards/confirmResetRefs.js";
import {getAddBotSession} from "../../state/addBotSession.js";
import {emojis} from "../../config/emojis.js";

export async function lookRefs(bot, chatId, userId, messageId) {
    const session = getAddBotSession(userId)
    session.state = "CONFIRM_RESET_REFS"
    bot.editMessageText(`<tg-emoji emoji-id=\'${emojis.warning3 }\'>❌</tg-emoji> Точно обнулить рефки?`, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: confirmResetRefsKeyboard(),
        parse_mode: 'HTML'
    })
}