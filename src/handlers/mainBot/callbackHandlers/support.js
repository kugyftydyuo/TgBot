import {backSupportKeyboard, backKeyboard} from "../../../utils/keyboards.js";

export async function support(bot, chatId, messageId) {
    await bot.editMessageText(
        'Связаться с нами можно по следующим контактам:\nhttps://t.me/uglyscum_x',
        {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: backSupportKeyboard()
        }
    );
}

export async function supportIsSub(bot, chatId, messageId) {
    await bot.editMessageText(
        'Связаться с нами можно по следующим контактам:\nhttps://t.me/uglyscum_x',
        {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: backKeyboard()
        }
    );
}