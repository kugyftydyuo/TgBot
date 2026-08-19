import {getUserOptions, setUserState} from "../../../state/session.js";
import {foundFilmKeyboard} from "../../../utils/keyboards.js";
import {msgIsNotModifiedError, updateBot} from "../../../config/strings.js";

export async function waitingCodeSecondTime(bot, chatId, userId, messageId) {
    try {
        const userOptions = getUserOptions(userId)

        setUserState(userId, "WAITING_CODE_SECOND_TIME")
        await bot.deleteMessage(chatId, messageId)

        await bot.editMessageText("Для того чтобы отправить код нажми на кнопку Поиск по коду🔎", {
            chat_id: chatId,
            message_id: userOptions.botMessageId,
            reply_markup: foundFilmKeyboard()
        });
    } catch (e) {
        if (e.message === msgIsNotModifiedError) {
            await bot.deleteMessage(chatId, messageId)
        } else {
            await bot.sendMessage(chatId, updateBot)
        }
    }
}