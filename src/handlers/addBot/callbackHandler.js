import {addMovie, editMovie, getMovieState} from "../../services/moviesService.js";

export async function callbackHandler(query, bot) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    const movieState = getMovieState(userId)
    const username = query.from.username
    const lastName = query.from.first_name

    if (query.data === "romance") {
        try {
            if (movieState.type === "add") {
                addMovie(movieState, "Романтика")
                await bot.deleteMessage(chatId, messageId)
                await bot.sendMessage(8501167201, `${username ? username : lastName} добавил новый фильм!!!\n🗯 Название: ${movieState.name}\n📒 Кол-во серий: ${movieState.series}\n🎬 Жанр: Романтика`)
                await bot.sendMessage(1942693598, `${username ? username : lastName} добавил новый фильм!!!\n🗯 Название: ${movieState.name}\n📒 Кол-во серий: ${movieState.series}\n🎬 Жанр: Романтика`)
                return bot.sendMessage(chatId, `✅ Фильм был добавлен по коду ${movieState.code}`)
            } else {
                editMovie(movieState, "Романтика")
                await bot.deleteMessage(chatId, messageId)
                return bot.sendMessage(chatId, `✅ Фильм успешно изменен`)
            }
        } catch {
            return bot.sendMessage(chatId, "⚠ Произошла ошибка. Начни заново")
        }
    }
}