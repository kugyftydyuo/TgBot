import {checkSubscription} from "../../../services/subscriptionService.js";
import {editRef} from "../../../services/refsService.js";
import {backKeyboard} from "../../../keyboards/back.js";
import {checkKeyboard} from "../../../keyboards/check.js";
import {getMovies} from "../../../services/moviesService.js";
import {saveStats} from "../../../services/statsService.js";
import {moviesList, msgIsNotModifiedError, updateBot} from "../../../consts/strings.js";
import {types} from "../../../config/parallels.js";
import {isDev} from "../../../config/rules.js";

export async function searchRandom(bot, query) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const checkSub = isDev ? {isSubscribed: true} : await checkSubscription(bot, userId)
    saveStats("searchRandom", userId)

    await editRef(userId, checkSub);

    if (checkSub.isSubscribed) {
        try {
            const movies = getMovies()
            const type = query.data.replace("search_random_", "")
            const filteredMovies = movies.filter(movie => movie.type === types[type])
            const randomMovie = filteredMovies.sort(() => Math.random() - 0.5).slice(0, 1)[0]

            await bot.editMessageText(`${type === "anime" ? "🎲Рандомное аниме:" : "🎲Рандомный фильм:"}\n\n${moviesList(randomMovie)}`, {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: backKeyboard()
            })
        } catch (e) {
            if (e.message !== msgIsNotModifiedError) {
                console.log(e)
                await bot.sendMessage(chatId, updateBot)
            }
        }
    } else {
        try {
            await bot.editMessageText('❌ Подпишись на все каналы', {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: checkKeyboard()
            });
        } catch (e) {
            if (e.message !== msgIsNotModifiedError) {
                await bot.sendMessage(chatId, updateBot)
            }
        }
    }
}