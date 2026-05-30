import {backSupportKeyboard} from "../../../utils/keyboards.js";

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