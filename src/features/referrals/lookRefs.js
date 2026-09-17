import {confirmResetRefsKeyboard} from "../../keyboards/confirmResetRefs.js";
import {getAddBotSession} from "../../state/addBotSession.js";

export async function lookRefs(bot, chatId, userId, messageId) {
    const session = getAddBotSession(userId)
    session.state = "CONFIRM_RESET_REFS"
    bot.editMessageText("⚠️Точно обнулить рефки?", {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: confirmResetRefsKeyboard()
    })
}