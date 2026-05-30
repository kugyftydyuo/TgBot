import {check} from "./callbackHandlers/check.js";
import {search} from "./callbackHandlers/search.js";
import {support} from "./callbackHandlers/support.js";
import {backSupport} from "./callbackHandlers/backSupport.js";
import {search_random} from "./callbackHandlers/search_random.js";
import {search_genre} from "./callbackHandlers/search_genre.js";
import {romance} from "./callbackHandlers/genre/romance.js";
import {back} from "./callbackHandlers/back.js";

export async function callbackHandler(query, bot) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    if (query.data === "check") {
        check(bot, userId, chatId, messageId)
    } else if (query.data === 'search') {
        search(bot, userId, chatId, messageId)
    } else if (query.data === 'support') {
        support(bot, chatId, messageId)
    } else if (query.data === 'back_support') {
        backSupport(bot, userId, chatId, messageId)
    } else if (query.data === 'search_random') {
        search_random(bot, userId, chatId, messageId)
    } else if (query.data === 'search_genre') {
        search_genre(bot, userId, chatId, messageId)
    } else if (query.data === 'search_romance') {
        romance(bot, userId, chatId, messageId)
    } else if (query.data === 'back') {
        back(bot, chatId, messageId)
    }
}