import {getRefs} from "../../../services/refsService.js";
import {resetRefsKeyboard, updateAllRefsKeyboard} from "../../../utils/keyboards.js";
import {msgIsNotModifiedError} from "../../../config/strings.js";

export async function updateRefs(bot, chatId, messageId, query) {
    try {
        const refs = getRefs()
        const callData = query.data.slice(11, query.data.length)

        let message = `${callData === "lastReset" ? "💸Ваши рефки с прошлого обнуления:" : "💸Ваши рефки за все время:"}\n\n`
        let count = 0
        for (let i = 0; i < refs.length; i++) {
            if (!refs[i]) break;

            if (callData === "lastReset") {
                message += `${refs[i].name}: 👤${refs[i].last_reset}\n💰${refs[i].last_reset * 6}р\n\n`
                count += refs[i].last_reset
            } else {
                message += `${refs[i].name}: 👤${refs[i].always}\n\n`
                count += refs[i].always
            }

        }
        message += `Общее количество: ${count}`

        bot.editMessageText(message, {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: callData === "lastReset" ? resetRefsKeyboard() : updateAllRefsKeyboard()
        })

    } catch (e) {
        if (e === msgIsNotModifiedError) {
            return null
        }
    }
}