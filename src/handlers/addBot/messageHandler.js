import {deleteMovieH} from "./messageHandlers/deleteMovieH.js";
import {addMovieName} from "./messageHandlers/addMovieName.js";
import {addMovieEpisodes} from "./messageHandlers/addMovieEpisodes.js";
import {writingCodeForEditMovie} from "./messageHandlers/writingCodeForEditMovie.js";
import {editMovieName} from "./messageHandlers/editMovieName.js";
import {editMovieEpisodes} from "./messageHandlers/editMovieEpisodes.js";
import {lookMovieCode} from "./messageHandlers/lookMovieCode.js";
import {getSession} from "../../state/sessionAddBot.js";
import {buttons} from "../../config/strings.js";

export async function messageHandler(msg, bot) {
    const chatId = msg.chat.id
    const userId = msg.from.id
    const text = msg.text
    if (buttons.includes(text)) return

    const session = getSession(userId)
    switch (session.state) {
        case 'ADD_MOVIE_NAME':
            addMovieName(chatId, bot, text, userId)
            break;
        case 'ADD_MOVIE_EPISODES':
            addMovieEpisodes(chatId, bot, text, userId)
            break;
        case 'WRITING_CODE_FOR_EDIT_MOVIE':
            writingCodeForEditMovie(chatId, bot, text, userId)
            break
        case 'EDIT_MOVIE_NAME':
            editMovieName(chatId, bot, text, userId)
            break
        case 'EDIT_MOVIE_EPISODES':
            editMovieEpisodes(chatId, bot, text, userId)
            break
        case 'LOOK_MOVIE_CODE':
            lookMovieCode(chatId, bot, text, userId)
            break
        case 'DELETE_MOVIE':
            deleteMovieH(chatId, bot, text, userId)
            break
    }
}