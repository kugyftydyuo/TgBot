import {getUserOptions, setUserBotMessageId, setUserState} from "../../../state/session.js";
import {checkSubscription} from "../../../services/subscriptionService.js";
import {backKeyboard, checkKeyboard} from "../../../utils/keyboards.js";
import {editRef} from "../../../services/refsService.js";
import {saveStats} from "../../../services/statsService.js";
import {msgIsNotModifiedError, updateBot} from "../../../config/strings.js";

export async function search(bot, userId, chatId, messageId) {
    getUserOptions(userId)
    saveStats("searchCode")

    const checkSub = await checkSubscription(bot, userId)

    await editRef(bot, userId, checkSub);

    if (checkSub.isSubscribed) {
        setUserState(userId, "WAITING_CODE")
        try {
            setUserBotMessageId(userId, messageId)

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