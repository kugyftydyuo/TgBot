import {backKeyboard} from "../../../utils/keyboards.js";
import {msgIsNotModifiedError, updateBot} from "../../../config/strings.js";

export async function support(bot, chatId, messageId, callData) {
    try {
        await bot.editMessageText(
            callData.includes("ad") ? "По поводу рекламы обращаться к:\nhttps://t.me/UglyScum_xox" : 'Связаться с нами можно по следующим контактам:\nhttps://t.me/KHAN_ss1',
            {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: backKeyboard(callData === "support" || callData === "support_ad")
            }
        );
    } catch (e) {
        if (e.message !== msgIsNotModifiedError) {
            await bot.sendMessage(chatId, updateBot)
        }
    }
}