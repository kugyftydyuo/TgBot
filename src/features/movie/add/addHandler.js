import {workers} from "../../../config/workers.js";
import {getAddBotSession} from "../../../state/addBotSession.js";
import {typeKeyboard} from "../../../keyboards/type.js";

export async function addHandler(msg, bot) {
    const chatId = msg.chat.id
    const userId = msg.from.id

    if (workers.includes(userId)) {
        const session = getAddBotSession(userId);
        session.state = 'ADD_MOVIE_TYPE';
        session.data = {
            code: null,
            name: "",
            genre: "",
            type: ""
        }
        await bot.sendMessage(chatId, '📩 Добавление новой записи...\n\n❓ Что добавляем?', {
            reply_markup: typeKeyboard()
        });
    } else {
        return bot.sendMessage(chatId, "❌ Нет доступа")
    }
}