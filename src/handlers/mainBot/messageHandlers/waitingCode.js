import {getMovie} from "../../../services/moviesService.js";
import {getUserOptions, setUserState} from "../../../state/session.js";
import {moviesList, msgIsNotModifiedError, updateBot} from "../../../config/strings.js";
import {backKeyboard} from "../../../utils/keyboards.js";

export async function waitingCode(bot, chatId, userId, text, messageId) {
    const movie = getMovie(text);
    const userOptions = getUserOptions(userId)

    if (movie) {
        try {
            setUserState(userId, "IDLE")

            await bot.editMessageText(`${moviesList(movie)}`, {
                chat_id: chatId,
                message_id: userOptions.botMessageId,
                reply_markup: backKeyboard()
            })

            await bot.deleteMessage(chatId, messageId)
        } catch {
            await bot.sendMessage(chatId, updateBot)
        }
    } else {
        try {
            await bot.editMessageText("❌ Код неверный, перепроверь и отправь еще раз", {
                chat_id: chatId,
                message_id: userOptions.botMessageId,
                reply_markup: backKeyboard(false)
            })
            await bot.deleteMessage(chatId, messageId)
        } catch (e) {
            if (e.message === msgIsNotModifiedError) {
                await bot.deleteMessage(chatId, messageId)
            } else {
                await bot.sendMessage(chatId, updateBot)
            }
        }
    }
}