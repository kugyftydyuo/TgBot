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
                return bot.sendMessage(chatId, `"${words[1]}":\n🗯 Название: ${movies[words[1]].name}\n📒 Кол-во серий: ${movies[words[1]].series}\n🎬 Жанр: ${movies[words[1]].genre}`)
            }
        } else {
            const keys = Object.keys(movies)
            const values = Object.values(movies)

            let message = ``
            for (let i = 0; i < keys.length; i++) {
                message += `"${keys[i]}":\n🗯 Название: ${values[i].name}\n📒 Кол-во серий: ${values[i].series}\n🎬 Жанр: ${values[i].genre}\n\n`
            }

            return bot.sendMessage(chatId, message)
        }
    } else {
        return bot.sendMessage(chatId, '❌ Нет доступа')
    }
}