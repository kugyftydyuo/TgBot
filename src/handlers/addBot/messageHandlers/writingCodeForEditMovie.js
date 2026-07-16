import {editMovieKeyboard} from "../../../utils/keyboards.js";
import {getSession} from "../../../state/sessionAddBot.js";
import {getMovies} from "../../../services/moviesService.js";

export async function writingCodeForEditMovie(chatId, bot, text, userId) {
    const session = getSession(userId)
    const movies = getMovies()

    session.state = 'EDIT_MOVIE'
    session.data = {}
    if (!movies[text]) {
        return bot.sendMessage(chatId, '❌ Фильма с таким кодом не существует')
    } else {
        session.data.code = text
        session.data.type = movies[text].type
    }

    await bot.sendMessage(chatId, '🛠 Редактирование...\n\n👇 Что будем редактировать?', {
        reply_markup: editMovieKeyboard()
    });
}