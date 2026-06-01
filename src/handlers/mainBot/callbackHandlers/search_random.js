import {checkSubscription} from "../../../services/subscriptionService.js";
import {editRef} from "../../../services/refsService.js";
import {backKeyboard, checkKeyboard} from "../../../utils/keyboards.js";
import {getMovies} from "../../../services/moviesService.js";
import {saveStats} from "../../../services/statsService.js";

export async function search_random(bot, userId, chatId, messageId) {
    const checkSub = await checkSubscription(bot, userId)
    saveStats("searchRandom")

    await editRef(bot, userId, checkSub);

    if (checkSub.isSubscribed) {
        try {
            const movies = getMovies()
            const randomMovie = Object.entries(movies).sort(() => Math.random() - 0.5).slice(0, 1)[0][1]

            await bot.editMessageText(`🎲Рандомное аниме:\n\n🗯 Название: ${randomMovie.name}\n📒 Кол-во серий: ${randomMovie.episodes}\n🎬 Жанр: ${randomMovie.genre}`, {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: backKeyboard()
            })
        } catch {
            await bot.sendMessage(chatId, "⚠ Бот был обновлён. Перезапустите его")
        }
    } else {
        try {
            await bot.editMessageText('❌ Подпишитесь на все каналы', {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: checkKeyboard()
            });
        } catch {
            await bot.sendMessage(chatId, "⚠ Бот был обновлён. Перезапустите его")
        }
    }
}