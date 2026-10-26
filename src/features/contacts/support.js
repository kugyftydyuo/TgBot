import {backKeyboard} from "../../keyboards/back.js";
import {msgIsNotModifiedError, updateBot} from "../../consts/strings.js";

export async function support(bot, query) {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    try {
        await bot.editMessageText(
            "По поводу скупки, продажи траффика:\nhttps://t.me/ugly_hum",
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