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

        name = name.trim().replace(/\s+/g, ' ');

        const hasLink = /(https?:\/\/|www\.|t\.me|@)/i.test(name);

        if (hasLink) {
            return bot.sendMessage(chatId, '❌ Ссылки запрещены');
        }

        const bannedWords = [
            'ёб', 'еб', 'бля', 'ху', 'пид', 'пиз', 'шлюх', 'ган', 'гон', 'шалав'
        ];

        const lower = name.toLowerCase();
        const bad = bannedWords.some(word => lower.includes(word));

        if (bad) {
            return bot.sendMessage(chatId, '❌ Недопустимое слово');
        }

        const valid = /^[a-zA-Zа-яА-ЯёЁ0-9\s\-:()]+$/.test(name);

        if (!valid) {
            return bot.sendMessage(chatId, '❌ Недопустимые символы');
        }

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