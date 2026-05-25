import {check} from "./callbackHandlers/check.js";
import {search} from "./callbackHandlers/search.js";
import {support} from "./callbackHandlers/support.js";
import {back} from "./callbackHandlers/back.js";

export async function callbackHandler(query, bot) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    if (query.data === "check") {
        check(bot, userId, chatId, messageId)
    }
    if (query.data === 'search') {
        search(bot, userId, chatId, messageId)
    }
    if (query.data === 'support') {
        support(bot, chatId, messageId)
    }
    if (query.data === 'back') {
        back(bot, userId, chatId, messageId)
    }
}