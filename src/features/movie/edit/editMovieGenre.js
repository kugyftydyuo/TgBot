import {genres} from "../../../config/parallels.js";
import {moreGenresKeyboard} from "../../../keyboards/moreGenres.js";
import {getAddBotSession} from "../../../state/addBotSession.js";

export async function editMovieGenre(bot, query) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const session = getAddBotSession(userId)

    const addGenre = () => {
        if (session.data.genre.includes(genres[query.data])) return session.data.genre;
        return session.data.genre + genres[query.data] + " "
    }

    session.data.genre = addGenre()
    session.state = 'EDIT_MORE_GENRES'
    await bot.editMessageText('Добавить еще жанр?', {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: moreGenresKeyboard()
    })
}