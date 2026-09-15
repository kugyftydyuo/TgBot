import {admins} from "../../config/workers.js";
import {getSession} from "../../state/sessionAddBot.js";

export async function addCodeHandler(msg, bot) {
    const chatId = msg.chat.id
    const userId = msg.from.id

    if (admins.includes(userId)) {
        const session = getSession(userId);
        session.data = {
            code: null,
            genre: "",
            type: ""
        }
        session.state = 'ADD_MOVIE_CODE';
        await bot.sendMessage(chatId, '📩 Добавление новой записи...\n\n✍ Напиши код под которым нужно добавить фильм');
    } else {
        return bot.sendMessage(chatId, "❌ Нет доступа")
    }
}