import {getAddBotSession} from "../../../state/addBotSession.js";
import {getMovie} from "../../../services/moviesService.js";
import {emojis} from "../../../config/emojis.js";

export async function addMovieCode(bot, msg) {
    const chatId = msg.chat.id
    const userId = msg.from.id
    const text = msg.text

    const session = getAddBotSession(userId);
    const movie = getMovie(text)

    if (movie) {
        await bot.sendMessage(chatId, `<tg-emoji emoji-id=\'${emojis.no }\'>👍</tg-emoji> Фильм с таким кодом уже существует!`, {parse_mode: 'HTML'})
    } else {
        session.data.code = text
        session.state = 'ADD_MOVIE_NAME';
        await bot.sendMessage(chatId, `<tg-emoji emoji-id=\'${emojis.plus }\'>👍</tg-emoji> Добавление новой записи...\n\n<tg-emoji emoji-id=\'${emojis.pencil }\'>👍</tg-emoji> Напиши название`, {parse_mode: 'HTML'})
    }
}