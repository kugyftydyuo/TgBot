import {getRef, getRefs} from "../../services/refsService.js";
import {workersIds} from "../../config/parallels.js";
import {getAddBotSession} from "../../state/addBotSession.js";
import {resetRefsKeyboard} from "../../keyboards/resetRefs.js";
import {updateAllRefsKeyboard} from "../../keyboards/updateAllRefs.js";

export async function lookStats(bot, query) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const session = getAddBotSession(userId)

    if (query.data === "look_stats_my") {
        const ref = getRef(workersIds[userId])
        session.state = null
        await bot.editMessageText(`👨‍💼- ${ref.last_reset} чел`, {
            chat_id: chatId,
            message_id: messageId
        })
    }
    if (query.data === "look_stats_all") {
        const refs = getRefs()
        session.state = "LOOK_REFS"

        let lastResetMessage = ``
        let lastResetCount = 0
        for (let i = 0; i < refs.length; i++) {
            if (!refs[i]) break;

            lastResetMessage += `${refs[i].name}: 👤${refs[i].last_reset}\n`
            lastResetCount += refs[i].last_reset
        }
        lastResetMessage += `\nОбщее количество: ${lastResetCount}`

        let alwaysMessage = ``
        let alwaysCount = 0
        for (let i = 0; i < refs.length; i++) {
            if (!refs[i]) break;

            alwaysMessage += `${refs[i].name}: 👤${refs[i].always}\n`
            alwaysCount += refs[i].always
        }
        alwaysMessage += `\nОбщее количество: ${alwaysCount}`

        await bot.sendMessage(chatId, `💸Ваши рефки с прошлого обнуления:\n\n${lastResetMessage}`, {
            reply_markup: resetRefsKeyboard()
        })
        await bot.sendMessage(chatId, `💸Ваши рефки за все время:\n\n${alwaysMessage}`, {
            reply_markup: updateAllRefsKeyboard()
        })
        await bot.deleteMessage(chatId, messageId)
    }
}