import {getRights, setRights, setMessagesId} from "../../state/session.js";
import {checkSubscription} from "../../services/subscriptionService.js";
import {openAccess} from "../../utils/openingAccess.js";
import {foundFilmKeyboard, checkKeyboard, backKeyboard, startKeyboard} from "../../utils/keyboards.js";

export async function callbackHandler(query, bot) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const userRights = getRights(userId)

    if (query.data === "check") {
        const checkSub = await checkSubscription(bot, userId)

        await openAccess(bot, userId, checkSub);

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
    if (query.data === 'search') {
        setRights(userId, true, false)

        const checkSub = await checkSubscription(bot, userId)

        if (checkSub) {
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
    if (query.data === 'support') {
        await bot.editMessageText(
            'Связаться с нами можно по следующим контактам:\nhttps://t.me/uglyscum_q',
            {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: backKeyboard()
            }
        );
    }
    if (query.data === 'back') {
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
}