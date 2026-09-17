import {getAddBotSession} from "../../state/addBotSession.js";
import {addMovieGenre} from "../../features/movie/add/addMovieGenre.js";
import {editMovieH} from "../../features/movie/edit/editMovieH.js";
import {editMovieGenre} from "../../features/movie/edit/editMovieGenre.js";
import {editMovieType} from "../../features/movie/edit/editMovieType.js";
import {lookMovie} from "../../features/movie/look/lookMovie.js";
import {lookStats} from "../../features/statistics/lookStats.js";
import {addMovieType} from "../../features/movie/add/addMovieType.js";
import {addMoreGenres} from "../../features/movie/add/addMoreGenres.js";
import {editMoreGenres} from "../../features/movie/edit/editMoreGenres.js";
import {lookAllMovie} from "../../features/movie/look/lookAllMovie.js";
import {lookRefs} from "../../features/referrals/lookRefs.js";
import {updateRefs} from "../../features/referrals/updateRefs.js";
import {confirmResetRefs} from "../../features/referrals/confirmResetRefs.js";

const stateRoutes = {
    ADD_MOVIE_TYPE: addMovieType,
    ADD_MOVIE_GENRE: addMovieGenre,
    ADD_MORE_GENRES: addMoreGenres,
    EDIT_MOVIE: editMovieH,
    EDIT_MOVIE_GENRE: editMovieGenre,
    EDIT_MOVIE_TYPE: editMovieType,
    EDIT_MORE_GENRES: editMoreGenres,
    LOOK_MOVIE: lookMovie,
    LOOK_STATS: lookStats,
    LOOK_ALL_MOVIE: lookAllMovie,
    CONFIRM_RESET_REFS: confirmResetRefs
}

export async function callbackRouter(query, bot) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const session = getAddBotSession(userId);

    if (query.data === "resetRefs") {
        lookRefs(bot, chatId, userId, messageId, query)
        return
    } else if (query.data.startsWith("updateRefs")) {
        updateRefs(bot, chatId, messageId, query)
        return
    }

    const handler = stateRoutes[session.state];
    if (!handler) {
        return;
    }
    return handler(bot, query);
}