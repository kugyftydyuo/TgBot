import {admins} from "../../../config/workers.js";
import {getAddBotSession} from "../../../state/addBotSession.js";

export async function editHandler(msg, bot) {
    const chatId = msg.chat.id
    const userId = msg.from.id

    if (admins.includes(userId)) {
        const session = getAddBotSession(userId);
        session.state = 'WRITING_CODE_FOR_EDIT_MOVIE';
        await bot.sendMessage(chatId, '🛠 Редактирование...\n\n✍ Напиши код фильма который нужно изменить');
    } else {
        return bot.sendMessage(chatId, "❌ Нет доступа")
    }
}