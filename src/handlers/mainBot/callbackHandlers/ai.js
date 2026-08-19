import {getUserOptions} from "../../../state/session.js";

export async function ai(chatId, bot, userId, messageId) {
    const userOptions = getUserOptions(userId)
    userOptions.state = "AI"
    // bot.deleteMessage(chatId, messageId)
    // bot.sendMessage(chatId, "Это ии помощник, чтобы задать вопрос оплатите", {
    //     reply_markup: {
    //         inline_keyboard: [
    //             [{text: 'Оплатить', callback_data: 'buy'}]
    //         ]
    //     }
    // })
    bot.sendMessage(chatId, '🤑', {
        entities: [
            {
                type: 'custom_emoji',
                offset: 0,
                length: 2,
                custom_emoji_id: '6030727721078754686'
            }
        ]
    });
}