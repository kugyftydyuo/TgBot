import {getAddBotSession} from "../../../state/addBotSession.js";
import {getMovie} from "../../../services/moviesService.js";
import {moviesList} from "../../../consts/strings.js";
import {emojis} from "../../../config/emojis.js";

export async function lookMovieCode(bot, msg) {
    const chatId = msg.chat.id
    const userId = msg.from.id
    const text = msg.text

    const session = getAddBotSession(userId)
    const movie = getMovie(text)

    if (!movie) {
        return bot.sendMessage(chatId, `<tg-emoji emoji-id=\'${emojis.no }\'>👍</tg-emoji> Фильма с таким кодом не существует`, {parse_mode: 'HTML'})
    } else {
        session.state = null
        await bot.sendMessage(chatId, `"${text}":\n${moviesList(movie)}`, {parse_mode: 'HTML'})
    }
}