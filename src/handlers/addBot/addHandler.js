import {workers} from "../../config/workers.js";
import {addMovie, getMovies} from "../../services/moviesService.js";

export async function addHandler(msg, bot, name) {
    const chatId = msg.chat.id
    const userId = msg.from.id
    const username = msg.from.username
    const lastName = msg.from.first_name

    if (workers.includes(userId)) {
        const words = name.split(' ')
        const wordsWithoutCommand = words.slice(1, words.length)
        const newName = wordsWithoutCommand.join(' ').toLowerCase()

        if (words.length === 1) {
            return bot.sendMessage(chatId, 'Чтобы добавить фильм введи /add название')
        } else {
            const movies = getMovies()
            const keys = Object.keys(movies)
            const values = Object.values(movies)
            const code = Number(keys[keys.length - 1]) + 1

            const title = newName.trim().replace(/\s+/g, ' ');

            const hasLink = /(https?:\/\/|www\.|t\.me|@)/i.test(title);

            if (hasLink) {
                return bot.sendMessage(chatId, '❌ Ссылки запрещены');
            }

            const valid = /^[a-zA-Zа-яА-ЯёЁ0-9\s\-:(),*.]+$/.test(title);

            if (!valid) {
                return bot.sendMessage(chatId, '❌ Недопустимые символы');
            }

            let lowerCaseValues = []
            values.map(movie => lowerCaseValues = [...lowerCaseValues, movie.toLowerCase()])

            if (!lowerCaseValues.includes(newName)) {
                addMovie(code.toString(), newName);
                await bot.sendMessage(8501167201, `${username ? username : lastName} добавил фильм с названием ${newName} под кодом ${code}`)
                await bot.sendMessage(1942693598, `${username ? username : lastName} добавил фильм с названием ${newName} под кодом ${code}`)
                return bot.sendMessage(chatId, `✅ Фильм добавлен по коду ${code}`);
            } else {
                return bot.sendMessage(chatId, `✅ Фильм добавлен по коду ${keys[values.indexOf(newName)]}`);
            }
        }
    } else {
        return bot.sendMessage(chatId, "❌ Нет доступа")
    }
}