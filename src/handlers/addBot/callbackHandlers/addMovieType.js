import {getSession} from "../../../state/sessionAddBot.js";

export async function addMovieType(bot, chatId, userId, messageId, query) {
    const session = getSession(userId)

    session.state = "ADD_MOVIE_NAME"
    if (query.data === "type_anime") {
        session.data.type = "Аниме"
    } else {
        session.data.type = "Дорама"
    }
    await bot.deleteMessage(chatId, messageId)
    await bot.sendMessage(chatId, "📩 Добавление новой записи...\n\n✍ Напиши название")
}