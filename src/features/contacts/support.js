import {backKeyboard} from "../../keyboards/back.js";
import {msgIsNotModifiedError, updateBot} from "../../consts/strings.js";

export async function support(bot, query) {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    try {
        await bot.editMessageText(
            query.data.includes("ad") ? "По поводу рекламы обращаться к:\nhttps://t.me/UglyScum_xox" : 'Связаться с нами можно по следующим контактам:\nhttps://t.me/KHAN_ss1',
            {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: backKeyboard(query.data === "support" || query.data === "support_ad")
            }
        );
    } catch (e) {
        if (e.message !== msgIsNotModifiedError) {
            await bot.sendMessage(chatId, updateBot)
        }
    }
}