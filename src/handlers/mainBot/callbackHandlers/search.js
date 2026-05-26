import {setMessagesId, setRights} from "../../../state/session.js";
import {checkSubscription} from "../../../services/subscriptionService.js";
import {checkKeyboard} from "../../../utils/keyboards.js";
import {editRef} from "../../../services/refsService.js";

export async function search(bot, userId, chatId, messageId) {
    setRights(userId, true, false)

    const checkSub = await checkSubscription(bot, userId)

    await editRef(bot, userId, checkSub);

    if (checkSub.isSubscribed) {
        setMessagesId(userId, messageId)

        await bot.editMessageText('✍ Напиши код из описания видео', {
            chat_id: chatId,
            message_id: messageId,
        });
    } else {
        await bot.editMessageText('❌ Подпишитесь на все каналы', {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: checkKeyboard()
        });
    }
}