import {checkSubscription} from "../../../services/subscriptionService.js";
import {checkKeyboard, doKeyboard} from "../../../utils/keyboards.js";
import {editRef} from "../../../services/refsService.js";
import {msgIsNotModifiedError, updateBot} from "../../../config/strings.js";
import {isDev} from "../../../config/rules.js";

export async function check(bot, userId, chatId, messageId) {
    const checkSub = isDev ? {isSubscribed: true} : await checkSubscription(bot, userId)

    await editRef(userId, checkSub);

    if (checkSub.isSubscribed) {
        try {
            await bot.editMessageText(
                '🔓 Доступ разрешен\n\nВыбери действие:',
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
            await bot.editMessageText('❌ Подпишись на все каналы, отправь заявки и нажми старт в ботах', {
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