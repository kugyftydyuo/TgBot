import {admins} from "../../config/workers.js";
import {getMovies} from "../../services/moviesService.js";

export function lookHandler(msg, bot, code) {
    const chatId = msg.chat.id
    const userId = msg.from.id

    if (admins.includes(userId)) {
        const movies = getMovies()
        const words = code.split(' ')

        if (words.length === 2) {
            if (!movies[words[1]]) {
                return bot.sendMessage(chatId, '❌ Фильма с таким кодом не существует')
            } else {
                return bot.sendMessage(chatId, `"${words[1]}": ${movies[words[1]]}`)
            }
        } else {
            const keys = Object.keys(movies)
            const values = Object.values(movies)

            let message = ``
            for (let i = 0; i < keys.length; i++) {
                message += `"${keys[i]}": ${values[i]}\n`
            }

            return bot.sendMessage(chatId, message)
        }
    } else {
        return bot.sendMessage(chatId, '❌ Нет доступа')
    }
}