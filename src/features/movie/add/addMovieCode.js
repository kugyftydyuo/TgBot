import {getAddBotSession} from "../../../state/addBotSession.js";
import {typeKeyboard} from "../../../keyboards/type.js";
import {getMovie} from "../../../services/moviesService.js";

export async function addMovieCode(bot, msg) {
    const chatId = msg.chat.id
    const userId = msg.from.id
    const text = msg.text

    const session = getAddBotSession(userId);
    const movie = getMovie(text)

    if (movie) {
        await bot.sendMessage(chatId, '❗️Фильм с таким кодом уже существует!')
    } else {
        session.data.code = text
        session.state = 'ADD_MOVIE_TYPE';
        await bot.sendMessage(chatId, '📩 Добавление новой записи...\n\n❓ Что добавляем?', {
            reply_markup: typeKeyboard()
        });
    }
}