import {check} from "./callbackHandlers/check.js";
import {search} from "./callbackHandlers/search.js";
import {support} from "./callbackHandlers/support.js";
import {backSupport} from "./callbackHandlers/backSupport.js";
import {search_random} from "./callbackHandlers/search_random.js";
import {search_genre, search_genre_start} from "./callbackHandlers/search_genre.js";
import {back} from "./callbackHandlers/back.js";
import {gameGuessNumber, guess} from "./callbackHandlers/gameGuessNumber.js";

export async function callbackHandler(query, bot) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    if (query.data === "check") {
        check(bot, userId, chatId, messageId)
    } else if (query.data === 'search') {
        search(bot, userId, chatId, messageId)
    } else if (query.data.startsWith('support')) {
        support(bot, chatId, messageId, query.data)
    } else if (query.data === 'back_support') {
        backSupport(bot, userId, chatId, messageId)
    } else if (query.data.startsWith('search_random_')) {
        search_random(bot, userId, chatId, messageId, query.data)
    } else if (query.data === 'search_genre') {
        search_genre_start(bot, userId, chatId, messageId)
    } else if (query.data.startsWith('search_genre_')) {
        search_genre(query.data, bot, chatId, messageId)
    } else if (query.data === 'back') {
        back(bot, chatId, messageId, userId)
    } else if (query.data === 'start_game_guess_number') {
        gameGuessNumber(chatId, bot, messageId, userId)
    } else if (query.data.startsWith('guess_number_')) {
        guess(chatId, bot, userId, query.data, messageId)
    }
}