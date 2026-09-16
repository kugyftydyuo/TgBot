import {getMainBotSession} from "../../state/mainBotSession.js";
import {startKeyboard} from "../../keyboards/start.js";
import {msgIsNotModifiedError, updateBot} from "../../consts/strings.js";

export async function backToMain(bot, query) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const session = getMainBotSession(userId)
    session.state = "IDLE"

    try {
        await bot.editMessageText(
            'Для того чтобы отправить код подпишись на следующие каналы и нажми ✅Проверить',
            {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: startKeyboard()
            }
        );
    } catch (e) {
        if (e.message !== msgIsNotModifiedError) {
            await bot.sendMessage(chatId, updateBot)
        }
    }
}