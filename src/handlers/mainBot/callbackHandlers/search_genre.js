import {checkSubscription} from "../../../services/subscriptionService.js";
import {editRef} from "../../../services/refsService.js";
import {backKeyboard, checkKeyboard, searchGenreKeyboard} from "../../../utils/keyboards.js";
import {saveStats} from "../../../services/statsService.js";
import {getMovies} from "../../../services/moviesService.js";
import {genres} from "../../../config/parallels.js";
import {updateBot} from "../../../config/strings.js";

export async function search_genre_start(bot, userId, chatId, messageId) {
    const checkSub = await checkSubscription(bot, userId)
    saveStats("searchGenre")

    await editRef(bot, userId, checkSub);

    if (checkSub.isSubscribed) {
        try {
            await bot.editMessageText('По какому жанру будем искать?', {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: searchGenreKeyboard()
            })
        } catch {
            await bot.sendMessage(chatId, updateBot)
        }
    } else {
        try {
            await bot.editMessageText('❌ Подпишитесь на все каналы', {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: checkKeyboard()
            });
        } catch {
            await bot.sendMessage(chatId, updateBot)
        }
    }
}

export async function search_genre(callData, bot, chatId, messageId) {
    const movies = getMovies()
    const genre = callData.slice(13, callData.length)
    const moviesWithGenre = Object.entries(movies).filter(movie => movie[1].genre === genres[genre])

    let message = ``;
    for (let i = 0; i < moviesWithGenre.length; i++) {
        message += `🗯 Название: ${moviesWithGenre[i][1].name}\n📒 Кол-во серий: ${moviesWithGenre[i][1].episodes}\n🎬 Жанр: ${moviesWithGenre[i][1].genre}\n\n`
    }

    try {
        if (moviesWithGenre.length === 0) {
            await bot.editMessageText(`🤷‍♂️ Похоже здесь пусто`, {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: backKeyboard()
            })
        } else {
            await bot.editMessageText(`Все записи с жанром "${genres[genre]}":\n\n${message}`, {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: backKeyboard()
            })
        }
    } catch (e) {
        await bot.sendMessage(chatId, updateBot)
    }
}