import {checkSubscription} from "../../services/subscriptionService.js";
import {checkKeyboard} from "../../keyboards/check.js"
import {doKeyboard} from "../../keyboards/do.js"
import {editRef} from "../../services/refsService.js";
import {msgIsNotModifiedError, updateBot} from "../../consts/strings.js";
import {isDev} from "../../config/rules.js";
import {emojis} from "../../config/emojis.js";

export async function check(bot, query) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const checkSub = isDev ? {isSubscribed: true} : await checkSubscription(bot, userId)

    await editRef(userId, checkSub);

    if (checkSub.isSubscribed) {
        try {
            await bot.editMessageText(`<tg-emoji emoji-id=\'${emojis.check}\'>👍</tg-emoji>Подписка подтверждена\n\n` +
                `<tg-emoji emoji-id=\'${emojis.square_message}\'>🎬</tg-emoji>Для того чтобы получить <b>название</b> выполняй следующие шаги:\n\n` +
                `<tg-emoji emoji-id=\'${emojis.num1}\'>📌</tg-emoji>Нажми на кнопку <tg-emoji emoji-id=\'${emojis.search}\'>🔎</tg-emoji><b>Поиск по коду</b>\n\n` +
                `<tg-emoji emoji-id=\'${emojis.num2}\'>📌</tg-emoji>Отправь в чат код из <b>описания видео</b> которое ты только что смотрел(а) в <tg-emoji emoji-id=\'${emojis.TikTok}\'>👍</tg-emoji><i>Tik Tok</i> или <tg-emoji emoji-id=\'${emojis.YouTube}\'>👍</tg-emoji><i>YouTube</i>\n\n` +
                `<tg-emoji emoji-id=\'${emojis.num3}\'>📌</tg-emoji>Готово!\n\n` +
                `<tg-emoji emoji-id=\'${emojis.zakrep}\'>📌</tg-emoji><i>Если хочешь зарабатывать на нарезках отправь в чат: </i><b><code>🤝Набор трафферов</code></b>\n\n<i>Либо нажми на соответствующую кнопку</i>`, {
                    chat_id: chatId,
                    message_id: messageId,
                    reply_markup: doKeyboard(),
                    parse_mode: 'HTML'
                }
            );
        } catch (e) {
            console.log(e)
            if (e.message !== msgIsNotModifiedError) {
                await bot.sendMessage(chatId, updateBot, {parse_mode: 'HTML'})
            }
        }
    } else {
        try {
            await bot.editMessageText(`<tg-emoji emoji-id=\'${emojis.cross}\'>❌</tg-emoji> Подпишись на все каналы`, {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: checkKeyboard(),
                parse_mode: 'HTML'
            });
        } catch (e) {
            if (e.message !== msgIsNotModifiedError) {
                await bot.sendMessage(chatId, updateBot, {parse_mode: 'HTML'})
            }
        }
    }
}