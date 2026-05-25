import {getRights, setRights} from "../../../state/session.js";
import {startKeyboard} from "../../../utils/keyboards.js";

export async function back(bot, userId, chatId, messageId) {
    const userRights = getRights(userId)

    setRights(userId, false, userRights.secondAttempt)
    await bot.editMessageText(
        'Для того чтобы отправить код подпишись на следующие каналы и нажми ✅Проверить',
        {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: startKeyboard()
        }
    );
}