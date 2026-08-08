import {getUserOptions, setUserState} from "../../state/session.js";
import {getMovie} from "../../services/moviesService.js";
import {backKeyboard, foundFilmKeyboard} from "../../utils/keyboards.js";
import {moviesList, msgIsNotModifiedError, updateBot} from "../../config/strings.js";

export async function messageHandler(chatId, text, messageId, userId, bot) {
    const userOptions = getUserOptions(userId)

        if (text.startsWith('/start')) return;

        if (userOptions.state === "WAITING_CODE") {
            const movie = getMovie(text);

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
        } else {
            if (userOptions.state !== "WAITING_CODE_SECOND_TIME") {
                try {
                    setUserState(userId, "WAITING_CODE_SECOND_TIME")
                    await bot.deleteMessage(chatId, messageId)

                    await bot.editMessageText("Для того чтобы отправить код нажми на кнопку Поиск по коду🔎", {
                        chat_id: chatId,
                        message_id: userOptions.botMessageId,
                        reply_markup: foundFilmKeyboard()
                    });
                } catch (e) {
                    if (e.message === msgIsNotModifiedError) {
                        await bot.deleteMessage(chatId, messageId)
                    } else {
                        await bot.sendMessage(chatId, updateBot)
                    }
                }
            } else {
                await bot.deleteMessage(chatId, messageId)
            }
        }
}