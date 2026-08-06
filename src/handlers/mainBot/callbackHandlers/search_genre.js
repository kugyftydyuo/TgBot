import {checkSubscription} from "../../../services/subscriptionService.js";
import {editRef} from "../../../services/refsService.js";
import {backKeyboard, checkKeyboard, doKeyboard, pagesKeyboard, searchGenreKeyboard} from "../../../utils/keyboards.js";
import {saveStats} from "../../../services/statsService.js";
import {getMovies} from "../../../services/moviesService.js";
import {genres} from "../../../config/parallels.js";
import {moviesList, msgIsNotModifiedError, updateBot} from "../../../config/strings.js";
import {getUserOptions, setUserSearchGenre, setUserState} from "../../../state/session.js";

export async function search_genre_start(bot, userId, chatId, messageId) {
    const checkSub = await checkSubscription(bot, userId)
    saveStats("searchGenre", userId)

    await editRef(userId, checkSub);

    try {
        if (checkSub.isSubscribed) {
                await bot.editMessageText('По какому жанру будем искать?', {
                    chat_id: chatId,
                    message_id: messageId,
                    reply_markup: searchGenreKeyboard()
                })
        } else {
                await bot.editMessageText('❌ Подпишись на все каналы', {
                    chat_id: chatId,
                    message_id: messageId,
                    reply_markup: checkKeyboard()
                });
        }
    } catch (e) {
        if (e.message !== msgIsNotModifiedError) {
            await bot.sendMessage(chatId, updateBot)
        }
    }
}

export async function search_genre(callData, bot, chatId, userId, messageId) {
    const movies = getMovies()

    const genre = callData.slice(13, callData.length)
    setUserSearchGenre(userId, genre)
    const moviesWithGenre = Object.entries(movies).filter(movie => movie[1].genre.includes(genres[genre]))

    let message = ``;
    for (let i = 0; i < 5; i++) {
        if (i === moviesWithGenre.length) break
        message += `${moviesList(moviesWithGenre[i][1])}`
    }

    try {
        if (moviesWithGenre.length === 0) {
            await bot.editMessageText(`🤷‍♂️ Похоже здесь пусто`, {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: backKeyboard()
            })
        } else {
            await bot.editMessageText(`Все записи с жанром "${genres[genre]}":                                  CТРАНИЦА 1\n\n${message}`, {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: pagesKeyboard(moviesWithGenre.length, "genre")
            })
        }
    } catch (e) {
        if (e.message !== msgIsNotModifiedError) {
            await bot.sendMessage(chatId, updateBot)
        }
    }
}

export async function search_genre_page(chatId, bot, userId, callData, messageId) {
    const page = Number(callData.slice(11, callData.length))
    const movies = getMovies()
    const userOptions = getUserOptions(userId)
    const moviesWithGenre = Object.entries(movies).filter(movie => movie[1].genre.includes(genres[userOptions.searchGenre]))

    if (moviesWithGenre.length === 0) {
        try {
            setUserState(userId, "IDLE")
            await bot.editMessageText(
                'Выбери действие:',
                {
                    chat_id: chatId,
                    message_id: messageId,
                    reply_markup: doKeyboard()
                }
            );
        } catch (e) {
            if (e.message !== msgIsNotModifiedError) {
                await bot.sendMessage(chatId, updateBot)
            }
        }
    } else {
        let message = `❗️                                                                                                              СТРАНИЦА ${page}\n\n`
        for (let i = (page - 1) * 5; i < page * 5; i++) {
            if (!moviesWithGenre[i]) break
            message += `${moviesList(moviesWithGenre[i][1])}`
        }

        try {
            await bot.editMessageText(message, {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: pagesKeyboard(moviesWithGenre.length, "genre")
            })
        } catch (e) {
            await bot.sendMessage(chatId, "Ты уже на этой странице!")
        }
    }
}