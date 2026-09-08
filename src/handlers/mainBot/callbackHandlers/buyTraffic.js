import {backKeyboard} from "../../../utils/keyboards.js";
import {msgIsNotModifiedError, updateBot} from "../../../config/strings.js";

export async function buyTraffic(bot, chatId, messageId, callData) {
    try {
        await bot.editMessageText(
            'По поводу скупки трафика:\nhttps://t.me/tryh9rd',
            {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: backKeyboard(callData === "buyTraffic")
            }
        );
    } catch (e) {
        if (e.message !== msgIsNotModifiedError) {
            await bot.sendMessage(chatId, updateBot)
        }
    }
}