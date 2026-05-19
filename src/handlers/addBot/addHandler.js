import {admins} from "../../config/admins.js";
import {addMovie, getMovies} from "../../services/moviesService.js";

export async function addHandler(msg, bot, name) {
    const chatId = msg.chat.id
    const userId = msg.from.id
    const username = msg.from.username
    const lastName = msg.from.first_name

    if (admins.includes(userId)) {
        const movies = getMovies()
        const keys = Object.keys(movies)
        const values = Object.values(movies)
        const code = Number(keys[keys.length - 1]) + 1
        if (!values.includes(name)) {
            addMovie(code.toString(), name);
            await bot.sendMessage(5429133787, `${username ? username : lastName} добавил фильм с названием ${name} под кодом ${code}`)
            return bot.sendMessage(chatId, `Фильм добавлен по коду ${code}`);
        } else {
            return bot.sendMessage(chatId, `Фильм добавлен по коду ${keys[values.indexOf(name)]}`);
        }
    } else {
        return bot.sendMessage(chatId, "Нет доступа")
    }
}