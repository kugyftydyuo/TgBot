import {setRights, getRights, getMessagesId} from "../../state/session.js";
import {getMovies} from "../../services/moviesService.js";
import {foundFilmAndBackKeyboard, foundFilmKeyboard} from "../../utils/keyboards.js";

export async function messageHandler(chatId, text, messageId, userId, bot) {
    const userRights = getRights(userId)
    const messagesId = getMessagesId(userId)

    try {
        if (text.startsWith('/start')) {
            return;
        }

        if (userRights.isWritingCode) {
            const movie = getMovies()[text];

            if (movie) {
                setRights(userId, false, false)

                await bot.editMessageText(`Название: ${movie}`, {
                    chat_id: chatId,
                    message_id: messagesId.botMessage,
                    reply_markup: foundFilmAndBackKeyboard()
                })

                await bot.deleteMessage(chatId, messageId)
            } else {
                try {
                    await bot.editMessageText("❌Код неверный, перепроверь и отправь еще раз", {
                        chat_id: chatId,
                        message_id: messagesId.botMessage
                    })
                    await bot.deleteMessage(chatId, messageId)
                } catch {
                    await bot.deleteMessage(chatId, messageId)
                }
            }
        } else {
            if (!userRights.secondAttempt) {
                await bot.deleteMessage(chatId, messageId)
                setRights(userId, userRights.isWritingCode, true)

                return bot.editMessageText("❌Для того чтобы отправить код нажми на кнопку Найти фильм-аниме🎥", {
                    chat_id: chatId,
                    message_id: messagesId.botMessage,
                    reply_markup: foundFilmKeyboard()
                });
            }

            await bot.deleteMessage(chatId, messageId)
        }
    } catch (e) {
        console.log(e.message)
    }
}