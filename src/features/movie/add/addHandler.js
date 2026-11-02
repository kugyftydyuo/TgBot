import {workers} from "../../../config/workers.js";
import {getAddBotSession} from "../../../state/addBotSession.js";
import {emojis} from "../../../config/emojis.js";

export async function addHandler(msg, bot) {
    const chatId = msg.chat.id
    const userId = msg.from.id

    if (workers.includes(userId.toString())) {
        const session = getAddBotSession(userId);
        session.state = 'ADD_MOVIE_NAME';
        session.data = {
            code: null,
            name: ""
        }
        await bot.sendMessage(chatId, `<tg-emoji emoji-id='${emojis.plus}'>👍</tg-emoji> Добавление новой записи...\n\n<tg-emoji emoji-id='${emojis.pencil}'>👍</tg-emoji> Напиши название`, {parse_mode: 'HTML'})
        // await bot.sendMessage(chatId, '📩 Добавление новой записи...\n\n❓ Что добавляем?', {
        //     reply_markup: typeKeyboard()
        // });
    } else {
        return bot.sendMessage(chatId, `<tg-emoji emoji-id='${emojis.angry}'>👍</tg-emoji> Нет доступа`, {parse_mode: 'HTML'})
    }
}