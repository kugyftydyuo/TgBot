import {getMainBotSession} from "../../../state/mainBotSession.js";
import {checkSubscription} from "../../../services/subscriptionService.js";
import {backKeyboard} from "../../../keyboards/back.js";
import {checkKeyboard} from "../../../keyboards/check.js";
import {editRef} from "../../../services/refsService.js";
import {saveStats} from "../../../services/statsService.js";
import {msgIsNotModifiedError, updateBot} from "../../../consts/strings.js";
import {isDev} from "../../../config/rules.js";

export async function search(bot, query) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const session = getMainBotSession(userId)
    saveStats("searchCode", userId)

    const checkSub = isDev ? {isSubscribed: true} : await checkSubscription(bot, userId)

    await editRef(userId, checkSub);

    if (checkSub.isSubscribed) {
        session.state = "WAITING_CODE"

        try {
            session.botMessageId = messageId

            await bot.editMessageText('✍ Напиши код из описания видео', {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: backKeyboard()
            });
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