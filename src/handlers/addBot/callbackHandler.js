import {getSession} from "../../state/sessionAddBot.js";
import {addMovieGenre} from "./callbackHandlers/addMovieGenre.js";
import {editMovieH} from "./callbackHandlers/editMovieH";
import {editMovieGenre} from "./callbackHandlers/editMovieGenre.js";
import {editMovieType} from "./callbackHandlers/editMovieType.js";
import {lookMovie} from "./callbackHandlers/lookMovie.js";
import {lookStats} from "./callbackHandlers/lookStats.js";
import {addMovieType} from "./callbackHandlers/addMovieType.js";

export async function callbackHandler(query, bot) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const session = getSession(userId);

    switch (session.state) {
        case 'ADD_MOVIE_GENRE':
            addMovieGenre(query, userId, chatId, bot, messageId)
            break
        case "EDIT_MOVIE":
            editMovieH(bot, chatId, userId, messageId, query)
            break
        case "EDIT_MOVIE_GENRE":
            editMovieGenre(bot, chatId, userId, messageId, query)
            break
        case "EDIT_MOVIE_TYPE":
            editMovieType(bot, chatId, userId, messageId, query)
            break
        case "LOOK_MOVIE":
            lookMovie(bot, chatId, userId, messageId, query)
            break
        case "LOOK_STATS":
            lookStats(bot, chatId, userId, messageId, query)
            break
        case "ADD_MOVIE_TYPE":
            addMovieType(bot, chatId, userId, messageId, query)
            break
    }
}