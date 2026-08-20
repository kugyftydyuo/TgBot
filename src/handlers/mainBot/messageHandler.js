import {getUserOptions} from "../../state/session.js";
import {waitingCode} from "./messageHandlers/waitingCode.js";

export async function messageHandler(chatId, text, messageId, userId, bot) {
    const userOptions = getUserOptions(userId)

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