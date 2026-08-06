import {checkSubscription} from "../../../services/subscriptionService.js";
import {editRef} from "../../../services/refsService.js";
import {backKeyboard, checkKeyboard} from "../../../utils/keyboards.js";
import {getMovies} from "../../../services/moviesService.js";
import {saveStats} from "../../../services/statsService.js";
import {moviesList, msgIsNotModifiedError, updateBot} from "../../../config/strings.js";
import {types} from "../../../config/parallels.js";

export async function search_random(bot, userId, chatId, messageId, callData) {
    const checkSub = await checkSubscription(bot, userId)
    saveStats("searchRandom", userId)

    await editRef(userId, checkSub);

    if (checkSub.isSubscribed) {
        try {
            const movies = getMovies()
            const type = callData.slice(14, callData.length)
            const filteredMovies = Object.entries(movies).filter(movie => movie[1].type === types[type])
            const randomMovie = filteredMovies.sort(() => Math.random() - 0.5).slice(0, 1)[0][1]

            await bot.editMessageText(`${type === "anime" ? "🎲Рандомное аниме:" : "🎲Рандомная дорама:"}\n\n${moviesList(randomMovie)}`, {
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