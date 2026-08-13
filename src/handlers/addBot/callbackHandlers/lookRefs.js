import {getRefs, resetRefs} from "../../../services/refsService.js";
import {resetRefsKeyboard} from "../../../utils/keyboards.js";
import {msgIsNotModifiedError} from "../../../config/strings.js";

export async function lookRefs(bot, chatId, messageId, query) {
        try {
            const refs = getRefs()

            let lastResetMessage = `💸Ваши рефки с прошлого обнуления:\n\n`
            for (let i = 0; i < refs.length; i++) {
                if (!refs[i]) break;

                lastResetMessage += `${refs[i].name}: 👤0\n💰0р\n\n`
            }
            lastResetMessage += `Общее количество: 0`

            bot.editMessageText(lastResetMessage, {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: resetRefsKeyboard()
            })
            resetRefs(query.data)
        } catch (e) {
            if (e === msgIsNotModifiedError) {
                return null
            }
        }
}