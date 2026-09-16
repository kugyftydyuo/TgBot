import {doKeyboard} from "../../keyboards/do.js";
import {getMainBotSession} from "../../state/mainBotSession.js";
import {msgIsNotModifiedError, updateBot} from "../../consts/strings.js";

export async function back(bot, query) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    try {
        const session = getMainBotSession(userId)
        session.state = "IDLE"
        await bot.editMessageText('Выбери действие:', {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: doKeyboard()
            }
        );
    } catch (e) {
        if (e.message !== msgIsNotModifiedError) {
            await bot.sendMessage(chatId, updateBot)
        }
    }
}