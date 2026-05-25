import {admins} from "../../config/workers.js";
import {editMovie, getMovies} from "../../services/moviesService.js";

export function editHandler(msg, bot, edit) {
    const chatId = msg.chat.id
    const userId = msg.from.id

    if (admins.includes(userId)) {
        const movies = getMovies()
        const words = edit.split(' ')
        const wordsWithoutCommand = words.slice(2, words.length)
        const newName = wordsWithoutCommand.join(' ')

        if (words.length < 3) {
            return bot.sendMessage(chatId, 'Чтобы изменить название фильма введи /edit код_фильма_который_нужно_поменять новое_название_фильма')
        } else {
            if (!movies[words[1]]) {
                return bot.sendMessage(chatId, '❌ Фильма с таким кодом не существует')
            } else {
                editMovie(words[1], newName)
                return bot.sendMessage(chatId, `✅ Фильм под кодом ${words[1]} изменен на ${newName}`)
            }
        }
    } else {
        return bot.sendMessage(chatId, "❌ Нет доступа")
    }
}