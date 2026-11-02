import {getMovie} from "../../../services/moviesService.js";
import {getMainBotSession} from "../../../state/mainBotSession.js";
import {moviesList, msgIsNotModifiedError, updateBot} from "../../../consts/strings.js";
import {backKeyboard} from "../../../keyboards/back.js";
import {emojis} from "../../../config/emojis.js";

export async function waitingCode(bot, msg) {
    const chatId = msg.chat.id
    const userId = msg.from.id
    const text = msg.text
    const messageId = msg.message_id

    const movie = getMovie(text);
    const session = getMainBotSession(userId)

    if (movie) {
        try {
            await bot.editMessageText(`${moviesList(movie)}`, {
                chat_id: chatId,
                message_id: session.botMessageId,
                reply_markup: backKeyboard(),
                parse_mode: 'HTML'
            })
            await bot.deleteMessage(chatId, messageId)
        } catch {
            await bot.sendMessage(chatId, updateBot, {parse_mode: 'HTML'})
        }
    } else {
        try {
            await bot.editMessageText(`<tg-emoji emoji-id=\'${emojis.cross}\'>❌</tg-emoji> Код неверный, перепроверь и отправь еще раз`, {
                chat_id: chatId,
                message_id: session.botMessageId,
                reply_markup: backKeyboard(false),
                parse_mode: 'HTML'
            })
            await bot.deleteMessage(chatId, messageId)
        } catch (e) {
            if (e.message === msgIsNotModifiedError) {
                await bot.deleteMessage(chatId, messageId)
            } else {
                await bot.sendMessage(chatId, updateBot, {parse_mode: 'HTML'})
            }
        }
    }
}