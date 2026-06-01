import {doKeyboard} from "../../../utils/keyboards.js";
import {setUserState} from "../../../state/session.js";

export async function back(bot, chatId, messageId, userId) {
    try {
        setUserState(userId, "IDLE")
        await bot.editMessageText(
            'Выберите действие:',
            {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: doKeyboard()
            }
        );
    } catch (e) {
        await bot.sendMessage(chatId, "⚠ Бот был обновлён. Перезапустите его")
    }
}