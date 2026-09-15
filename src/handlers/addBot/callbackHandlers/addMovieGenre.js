import {genres} from "../../../config/parallels.js";
import {getSession} from "../../../state/sessionAddBot.js";
import {moreGenresKeyboard} from "../../../utils/keyboards.js";

export async function addMovieGenre(query, userId, chatId, bot, messageId) {
    const session = getSession(userId)

    const addGenre = () => {
        if (session.data.genre.includes(genres[query.data])) return session.data.genre;
        return session.data.genre + genres[query.data] + " "
    }

    session.data.genre = addGenre()
    session.state = "ADD_MORE_GENRES"

    await bot.editMessageText("Добавить еще жанр?", {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: moreGenresKeyboard()
    })
}