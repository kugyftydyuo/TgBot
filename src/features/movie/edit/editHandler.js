import {admins} from "../../../config/workers.js";
import {getAddBotSession} from "../../../state/addBotSession.js";
import {emojis} from "../../../config/emojis.js";

export async function editHandler(msg, bot) {
    const chatId = msg.chat.id
    const userId = msg.from.id

    if (admins.includes(userId)) {
        const session = getAddBotSession(userId);
        session.state = 'WRITING_CODE_FOR_EDIT_MOVIE';
        await bot.sendMessage(chatId, `<tg-emoji emoji-id=\'${emojis.tool }\'>👍</tg-emoji> Редактирование...\n\n<tg-emoji emoji-id=\'${emojis.pencil }\'>👍</tg-emoji> Напиши код фильма который нужно изменить`, {parse_mode: 'HTML'});
    } else {
        return bot.sendMessage(chatId, `<tg-emoji emoji-id=\'${emojis.angry }\'>👍</tg-emoji> Нет доступа`, {parse_mode: 'HTML'})
    }
}