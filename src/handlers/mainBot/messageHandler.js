import {setRights, getRights, setMessagesId, getMessagesId} from "../../state/session.js";
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

                const botMessage = await bot.sendMessage(chatId, `Название: ${movie}`, {
                    reply_markup: foundFilmAndBackKeyboard()
                })

                setMessagesId(userId, botMessage.message_id)

                await bot.deleteMessage(chatId, messageId)
                await bot.deleteMessage(chatId, messagesId.botMessage)
            } else {
                const botMessage = await bot.sendMessage(chatId, "❌Код неверный, перепроверь и отправь еще раз")
                setMessagesId(userId, botMessage.message_id)
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