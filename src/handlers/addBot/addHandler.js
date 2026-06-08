import {workers} from "../../config/workers.js";
import {getSession} from "../../state/sessionAddBot.js";
import {typeKeyboard} from "../../utils/keyboards.js";

export async function addHandler(msg, bot) {
    const chatId = msg.chat.id
    const userId = msg.from.id

    if (workers.includes(userId)) {
        const session = getSession(userId);
        session.state = 'ADD_MOVIE_TYPE';
        await bot.sendMessage(chatId, '📩 Добавление новой записи...\n\n❓ Что добавляем?', {
            reply_markup: typeKeyboard()
        });
    } else {
        return bot.sendMessage(chatId, "❌ Нет доступа")
    }
}