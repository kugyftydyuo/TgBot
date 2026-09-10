import {getUserOptions} from "../../state/session.js";
import {waitingCode} from "./messageHandlers/waitingCode.js";

export async function messageHandler(msg, bot) {
    const chatId = msg.chat.id
    const userId = msg.from.id
    const text = msg.text
    const messageId = msg.message_id
    const userOptions = getUserOptions(userId)

    if (msg.animation) {
        console.log('Ваш file_id:', msg.animation.file_id);
    }

    if (text.startsWith("/start")) return

    switch (userOptions.state) {
        case 'IDLE':
            bot.deleteMessage(chatId, messageId)
            break
        case 'WAITING_CODE':
            waitingCode(bot, chatId, userId, text, messageId)
            break
    }
}