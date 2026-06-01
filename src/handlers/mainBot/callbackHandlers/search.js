import {getUserOptions, setUserBotMessageId, setUserState} from "../../../state/session.js";
import {checkSubscription} from "../../../services/subscriptionService.js";
import {backKeyboard, checkKeyboard} from "../../../utils/keyboards.js";
import {editRef} from "../../../services/refsService.js";
import {saveStats} from "../../../services/statsService.js";

export async function search(bot, userId, chatId, messageId) {
    getUserOptions(userId)
    setUserState(userId, "WAITING_CODE")
    saveStats("searchCode")

    const checkSub = await checkSubscription(bot, userId)

    await editRef(bot, userId, checkSub);

    if (checkSub.isSubscribed) {
        try {
            setUserBotMessageId(userId, messageId)

            await bot.editMessageText('✍ Напиши код из описания видео', {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: backKeyboard()
            });
        } catch {
            await bot.sendMessage(chatId, "⚠ Бот был обновлён. Перезапустите его")
        }
    } else {
        try {
            await bot.editMessageText('❌ Подпишитесь на все каналы', {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: checkKeyboard()
            });
        } catch {
            await bot.sendMessage(chatId, "⚠ Бот был обновлён. Перезапустите его")
        }
    }
}