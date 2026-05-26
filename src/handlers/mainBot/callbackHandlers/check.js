import {checkSubscription} from "../../../services/subscriptionService.js";
import {checkKeyboard, foundFilmKeyboard} from "../../../utils/keyboards.js";
import {editRef} from "../../../services/refsService.js";

export async function check(bot, userId, chatId, messageId) {
    const checkSub = await checkSubscription(bot, userId)

    await editRef(bot, userId, checkSub);

    if (checkSub.isSubscribed) {
        await bot.editMessageText(
            '✅ Доступ разрешён                      \n\nВыберите действие:',
            {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: foundFilmKeyboard()
            }
        );
    } else {
        await bot.editMessageText('❌ Подпишитесь на все каналы', {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: checkKeyboard()
        });
    }
}