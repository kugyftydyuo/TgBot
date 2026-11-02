import {getMainBotSession} from "../../state/mainBotSession.js";
import {startKeyboard} from "../../keyboards/start.js";
import {msgIsNotModifiedError, updateBot} from "../../consts/strings.js";
import {emojis} from "../../config/emojis.js";

export async function backToMain(bot, query) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const session = getMainBotSession(userId)
    session.state = "IDLE"

    try {
        await bot.editMessageText(
            `<tg-emoji emoji-id='${emojis.square_message}'>👍</tg-emoji> Для того чтобы получить название подпишись на следующие каналы и нажми <tg-emoji emoji-id='${emojis.check}'>👍</tg-emoji> Проверить`,
            {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: startKeyboard(),
                parse_mode: 'HTML'
            }
        );
    } catch (e) {
        if (e.message !== msgIsNotModifiedError) {
            await bot.sendMessage(chatId, updateBot, {parse_mode: 'HTML'})
        }
    }
}