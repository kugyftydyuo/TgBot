import {editMovieKeyboard} from "../../../keyboards/editMovie.js";
import {getAddBotSession} from "../../../state/addBotSession.js";
import {getMovie} from "../../../services/moviesService.js";
import {emojis} from "../../../config/emojis.js";

export async function writingCodeForEditMovie(bot, msg) {
    const chatId = msg.chat.id
    const userId = msg.from.id
    const text = msg.text

    const session = getAddBotSession(userId)
    const movie = getMovie(text)

    session.state = 'EDIT_MOVIE'
    session.data = {}
    if (!movie) {
        return bot.sendMessage(chatId, `<tg-emoji emoji-id=\'${emojis.no }\'>👍</tg-emoji> Фильма с таким кодом не существует`, {parse_mode: 'HTML'})
    } else {
        session.data.code = text
    }

    await bot.sendMessage(chatId, `<tg-emoji emoji-id=\'${emojis.tool }\'>👍</tg-emoji> Редактирование...\n\n<tg-emoji emoji-id=\'${emojis.down2 }\'>👍</tg-emoji> Что будем редактировать?`, {
        reply_markup: editMovieKeyboard(),
        parse_mode: 'HTML'
    });
}