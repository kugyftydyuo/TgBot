import {getAddBotSession} from "../../../state/addBotSession.js";
import {getMovie, deleteMovie} from "../../../services/moviesService.js";
import {emojis} from "../../../config/emojis.js";

export async function deleteMovieH(bot, msg) {
    const chatId = msg.chat.id
    const userId = msg.from.id
    const text = msg.text

    const session = getAddBotSession(userId)
    const movie = getMovie(text)

    if (!movie) {
        return bot.sendMessage(chatId, `<tg-emoji emoji-id=\'${emojis.no }\'>👍</tg-emoji> Фильма с таким кодом не существует`, {parse_mode: 'HTML'})
    } else {
        deleteMovie(text)
        session.state = null
        await bot.sendMessage(chatId, `<tg-emoji emoji-id=\'${emojis.check3 }\'>👍</tg-emoji> Фильм с кодом ${text} успешно удален`, {parse_mode: 'HTML'})
    }
}