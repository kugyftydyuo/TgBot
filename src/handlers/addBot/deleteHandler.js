import {admins} from "../../config/workers.js";
import {deleteMovie, getMovies} from "../../services/moviesService.js";
import {getSession} from "../../state/sessionAddBot.js";

export function deleteHandler(msg, bot, code) {
    const chatId = msg.chat.id
    const userId = msg.from.id

    if (admins.includes(userId)) {
        const session = getSession(userId)
        session.state = 'DELETE_MOVIE'
        return bot.sendMessage(chatId, '✍ Напиши код')
        // const movies = getMovies()
        // const words = code.split(' ')
        //
        // if (words.length !== 2) {
        //     return bot.sendMessage(chatId, 'Чтобы удалить фильм введи /delete код_фильма_который_нужно_удалить')
        // } else {
        //     if (!movies[words[1]]) {
        //         return bot.sendMessage(chatId, '❌ Фильма с таким кодом не существует')
        //     } else {
        //         deleteMovie(words[1])
        //         return bot.sendMessage(chatId, `✅ Фильм с кодом ${words[1]} успешно удален`)
        //     }
        // }
    } else {
        return bot.sendMessage(chatId, "❌ Нет доступа")
    }
}