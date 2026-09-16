import {editMovieKeyboard} from "../../../keyboards/editMovie.js";
import {getAddBotSession} from "../../../state/addBotSession.js";
import {getMovie} from "../../../services/moviesService.js";

export async function writingCodeForEditMovie(bot, msg) {
    const chatId = msg.chat.id
    const userId = msg.from.id
    const text = msg.text

    const session = getAddBotSession(userId)
    const movie = getMovie(text)

    session.state = 'EDIT_MOVIE'
    session.data = {}
    if (!movie) {
        return bot.sendMessage(chatId, '❌ Фильма с таким кодом не существует')
    } else {
        session.data.code = text
        session.data.type = movie.type
        session.data.genre = ""
    }

    await bot.sendMessage(chatId, '🛠 Редактирование...\n\n👇 Что будем редактировать?', {
        reply_markup: editMovieKeyboard()
    });
}