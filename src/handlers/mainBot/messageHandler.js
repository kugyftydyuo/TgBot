import {getUserOptions, setUserState} from "../../state/session.js";
import {getMovies} from "../../services/moviesService.js";
import {backKeyboard, foundFilmKeyboard} from "../../utils/keyboards.js";

export async function messageHandler(chatId, text, messageId, userId, bot) {
    const userOptions = getUserOptions(userId)

        if (text.startsWith('/start')) return;

        if (userOptions.state === "WAITING_CODE") {
            const movie = getMovies()[text];

            if (movie) {
                try {
                    setUserState(userId, "IDLE")

                    await bot.editMessageText(`Название: ${movie.name}`, {
                        chat_id: chatId,
                        message_id: userOptions.botMessageId,
                        reply_markup: backKeyboard()
                    })

                    await bot.deleteMessage(chatId, messageId)
                } catch {
                    await bot.sendMessage(chatId, "⚠ Бот был обновлён. Перезапустите его")
                }
            } else {
                try {
                    await bot.editMessageText("❌ Код неверный, перепроверь и отправь еще раз", {
                        chat_id: chatId,
                        message_id: userOptions.botMessageId
                    })
                    await bot.deleteMessage(chatId, messageId)
                } catch (e) {
                    if (e.message === 'ETELEGRAM: 400 Bad Request: message is not modified: specified new message content and reply markup are exactly the same as a current content and reply markup of the message') {
                        await bot.deleteMessage(chatId, messageId)
                    } else {
                        await bot.sendMessage(chatId, "⚠ Бот был обновлён. Перезапустите его")
                    }
                }
            }
        } else {
            try {
                await bot.deleteMessage(chatId, messageId)

                await bot.editMessageText("Для того чтобы отправить код нажми на кнопку Поиск по коду🔎", {
                    chat_id: chatId,
                    message_id: userOptions.botMessageId,
                    reply_markup: foundFilmKeyboard()
                });
            } catch (e) {
                if (e.message === 'ETELEGRAM: 400 Bad Request: message is not modified: specified new message content and reply markup are exactly the same as a current content and reply markup of the message') {
                    await bot.deleteMessage(chatId, messageId)
                } else {
                    await bot.sendMessage(chatId, "⚠ Бот был обновлён. Перезапустите его")
                }
            }
        }
}