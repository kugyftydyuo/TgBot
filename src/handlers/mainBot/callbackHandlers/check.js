import {checkSubscription} from "../../../services/subscriptionService.js";
import {checkKeyboard, doKeyboard} from "../../../utils/keyboards.js";
import {editRef} from "../../../services/refsService.js";
import {msgIsNotModifiedError, updateBot} from "../../../config/strings.js";

export async function check(bot, userId, chatId, messageId) {
    const checkSub = await checkSubscription(bot, userId)

    await editRef(bot, userId, checkSub);
    console.log("ura bot rabotaet")
    if (checkSub.isSubscribed) {
        try {
            await bot.editMessageText(
                '🔓 Доступ разрешён\n\nВыбери действие:',
                {
                    chat_id: chatId,
                    message_id: messageId,
                    reply_markup: doKeyboard()
                }
            );
        } catch (e) {
            if (e.message !== msgIsNotModifiedError) {
                await bot.sendMessage(chatId, updateBot)
            }
        }
    } else {
        try {
            await bot.editMessageText('❌ Подпишись на все каналы', {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: checkKeyboard()
            });
        } catch (e) {
            if (e.message !== msgIsNotModifiedError) {
                await bot.sendMessage(chatId, updateBot)
            }
        }
    }
}