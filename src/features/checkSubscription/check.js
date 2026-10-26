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
            await bot.editMessageText('🎬Для того чтобы получить <b>название</b> выполняй следующие шаги:\n\n' +
                '1⃣ Нажми на кнопку <b>Поиск по коду🔎</b>\n\n' +
                '2⃣ Отправь в чат код из <b>описания видео</b> которое ты только что смотрел(а) в <i>Tik Tok</i> или <i>YouTube</i>\n\n' +
                '3⃣ Готово!\n\n' +
                '📌<i>Если хочешь зарабатывать на нарезках отправь в чат: </i><b><code>🤝Набор трафферов</code></b>\n\n<i>Либо нажми на соответствующую кнопку</i>', {
                    chat_id: chatId,
                    message_id: messageId,
                    reply_markup: doKeyboard(),
                    parse_mode: 'HTML'
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