import {getUserOptions, setUserState} from "../../../state/session.js";
import {startKeyboard} from "../../../utils/keyboards.js";

export async function backSupport(bot, userId, chatId, messageId) {
    getUserOptions(userId)

    setUserState(userId, "IDLE")

    try {
        await bot.editMessageText(
            'Для того чтобы отправить код подпишись на следующие каналы и нажми ✅Проверить',
            {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: startKeyboard()
            }
        );
    } catch {
        await bot.sendMessage(chatId, "⚠ Бот был обновлён. Перезапустите его")
    }
}