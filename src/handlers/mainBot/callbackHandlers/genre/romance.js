import {backKeyboard} from "../../../../utils/keyboards.js";
import {getMovies} from "../../../../services/moviesService.js";

export async function romance(bot, userId, chatId, messageId) {
    const movies = getMovies()
    const romanceGenre = Object.entries(movies).filter(movie => movie[1].genre === "Романтика")

    let message = ``;
    for (let i = 0; i < romanceGenre.length; i++) {
        message += `🗯 Название: ${romanceGenre[i][1].name}\n📒 Кол-во серий: ${romanceGenre[i][1].series}\n🎬 Жанр: ${romanceGenre[i][1].genre}\n\n`
    }

    try {
        await bot.editMessageText(`Все записи с жанром "Романтика":\n\n${message}`, {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: backKeyboard()
        })
    } catch {
        await bot.sendMessage(chatId, "⚠ Бот был обновлён. Перезапустите его")
    }
}