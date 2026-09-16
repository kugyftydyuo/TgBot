import {checkSubscription} from "../../../services/subscriptionService.js";
import {editRef} from "../../../services/refsService.js";
import {backKeyboard} from "../../../keyboards/back.js";
import {searchGenreKeyboard} from "../../../keyboards/searchGenre.js";
import {checkKeyboard} from "../../../keyboards/check.js";
import {pagesKeyboard} from "../../../keyboards/pages.js";
import {doKeyboard} from "../../../keyboards/do.js";
import {saveStats} from "../../../services/statsService.js";
import {getMovies} from "../../../services/moviesService.js";
import {genres} from "../../../config/parallels.js";
import {moviesList, msgIsNotModifiedError, updateBot} from "../../../consts/strings.js";
import {getMainBotSession} from "../../../state/mainBotSession.js";
import {isDev} from "../../../config/rules.js";

export async function searchGenreStart(bot, query) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const checkSub = isDev ? {isSubscribed: true} : await checkSubscription(bot, userId)
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

export async function searchGenre(bot, query) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const movies = getMovies()

    const genre = query.data.replace("search_genre_", "")

    const session = getMainBotSession(userId)
    session.searchGenre = genre

    const moviesWithGenre = movies.filter(movie => movie.genre.includes(genres[genre]))

    let message = ``;
    for (let i = 0; i < 5; i++) {
        if (i === moviesWithGenre.length) break
        message += `${moviesList(moviesWithGenre[i])}`
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

export async function searchGenrePage(bot, query) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const page = Number(query.data.slice(11, query.data.length))
    const movies = getMovies()
    const session = getMainBotSession(userId)
    const moviesWithGenre = movies.filter(movie => movie.genre.includes(genres[session.searchGenre]))

    if (moviesWithGenre.length === 0) {
        try {
            session.state = "IDLE"
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
            message += `${moviesList(moviesWithGenre[i])}`
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