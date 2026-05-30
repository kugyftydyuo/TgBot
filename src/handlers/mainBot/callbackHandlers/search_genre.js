import {checkSubscription} from "../../../services/subscriptionService.js";
import {editRef} from "../../../services/refsService.js";
import {checkKeyboard, searchGenreKeyboard} from "../../../utils/keyboards.js";

export async function search_genre(bot, userId, chatId, messageId) {
    const checkSub = await checkSubscription(bot, userId)

    await editRef(bot, userId, checkSub);

    if (checkSub.isSubscribed) {
        try {
            await bot.editMessageText('По какому жанру будем искать?', {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: searchGenreKeyboard()
            })
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