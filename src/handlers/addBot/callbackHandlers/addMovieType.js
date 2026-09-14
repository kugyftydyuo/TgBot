import {getSession} from "../../../state/sessionAddBot.js";
import {types} from "../../../config/parallels.js";

export async function addMovieType(bot, chatId, userId, messageId, query) {
    const session = getSession(userId)
    const type = query.data.slice(5, query.data.length)

    session.state = "ADD_MOVIE_NAME"
    session.data.type = types[type]

    await bot.editMessageText("📩 Добавление новой записи...\n\n✍ Напиши название", {
        chat_id: chatId,
        message_id: messageId
    })
}