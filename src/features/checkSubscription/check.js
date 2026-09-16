import {checkSubscription} from "../../services/subscriptionService.js";
import {checkKeyboard} from "../../keyboards/check.js"
import {doKeyboard} from "../../keyboards/do.js"
import {editRef} from "../../services/refsService.js";
import {msgIsNotModifiedError, updateBot} from "../../consts/strings.js";
import {isDev} from "../../config/rules.js";

export async function check(bot, query) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

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