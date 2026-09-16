import {deleteMovieH} from "../../features/movie/delete/deleteMovieH.js";
import {addMovieName} from "../../features/movie/add/addMovieName.js";
import {writingCodeForEditMovie} from "../../features/movie/edit/writingCodeForEditMovie.js";
import {editMovieName} from "../../features/movie/edit/editMovieName.js";
import {lookMovieCode} from "../../features/movie/look/lookMovieCode.js";
import {getAddBotSession} from "../../state/addBotSession.js";
import {buttons} from "../../consts/strings.js";
import {addMovieCode} from "../../features/movie/add/addMovieCode.js";

const stateRoutes = {
    ADD_MOVIE_NAME: addMovieName,
    WRITING_CODE_FOR_EDIT_MOVIE: writingCodeForEditMovie,
    EDIT_MOVIE_NAME: editMovieName,
    LOOK_MOVIE_CODE: lookMovieCode,
    DELETE_MOVIE: deleteMovieH,
    ADD_MOVIE_CODE: addMovieCode
}

export async function messageRouter(msg, bot) {
    const userId = msg.from.id
    const text = msg.text
    if (buttons.includes(text)) return

    const session = getAddBotSession(userId)

    const handler = stateRoutes[session.state];
    if (!handler) {
        return;
    }
    await handler(bot, msg);
}