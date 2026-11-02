import {backKeyboard} from "../../keyboards/back.js";
import {msgIsNotModifiedError, updateBot} from "../../consts/strings.js";
import {emojis} from "../../config/emojis.js";

export async function buyTraffic(bot, query) {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    try {
        await bot.editMessageText(
            `<tg-emoji emoji-id='${emojis.eye}'>👍</tg-emoji> По поводу набора трафферов:\nhttps://t.me/nxtgoal`,
            {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: backKeyboard(query.data === "buy_traffic"),
                parse_mode: 'HTML'
            }
        );
    } catch (e) {
        if (e.message !== msgIsNotModifiedError) {
            await bot.sendMessage(chatId, updateBot, {parse_mode: 'HTML'})
        }
    }
}