import {admins} from "../../config/workers.js";
import {addMovieState, getMovies} from "../../services/moviesService.js";
import {genreKeyboard} from "../../utils/keyboards.js";

export function editHandler(msg, bot, edit) {
    const chatId = msg.chat.id
    const userId = msg.from.id

    if (admins.includes(userId)) {
        const movies = getMovies()
        const words = edit.split(' ')
        const code = words[1]
        const newSeries = words[2] === "-" ? movies[code].series : words[2]
        const newName = words.slice(3, words.length).join(' ') === "-" ? movies[code].name : words.slice(3, words.length).join(' ')

        if (words.length < 4) {
            return bot.sendMessage(chatId, 'Чтобы изменить название фильма введи /edit код_фильма_который_нужно_поменять новое_кол-во_серий новое_название_фильма')
        } else {
            if (!movies[code]) {
                return bot.sendMessage(chatId, '❌ Фильма с таким кодом не существует')
            } else {
                addMovieState(userId, newName, newSeries, code, "edit")
                return bot.sendMessage(chatId, "Укажи жанр нажав на кнопку", {
                    reply_markup: genreKeyboard()
                });
            }
        }
    } else {
        return bot.sendMessage(chatId, "❌ Нет доступа")
    }
}