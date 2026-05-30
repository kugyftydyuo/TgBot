import {doKeyboard} from "../../../utils/keyboards.js";

export async function back(bot, chatId, messageId) {
    try {
        await bot.editMessageText(
            '✅ Доступ разрешён                      \n\nВыберите действие:',
            {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: doKeyboard()
            }
        );
    } catch {
        await bot.sendMessage(chatId, "⚠ Бот был обновлён. Перезапустите его")
    }
}