import {backKeyboard} from "../../../utils/keyboards.js";
import {msgIsNotModifiedError, updateBot} from "../../../config/strings.js";

export async function support(bot, chatId, messageId, callData) {
    try {
        await bot.editMessageText(
            'Связаться с нами можно по следующим контактам:\nhttps://t.me/KHAN_xox',
            {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: backKeyboard(callData === "support")
            }
        );
    } catch (e) {
        if (e.message !== msgIsNotModifiedError) {
            await bot.sendMessage(chatId, updateBot)
        }
    }
}