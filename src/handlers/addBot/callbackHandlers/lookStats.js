import {getRef, getRefs} from "../../../services/refsService.js";
import {userIds} from "../../../config/parallels.js";
import {getSession} from "../../../state/sessionAddBot.js";
import {resetRefsKeyboard} from "../../../utils/keyboards.js";

export async function lookStats(bot, chatId, userId, messageId, query) {
    const session = getSession(userId)

    if (query.data === "look_stats_my") {
        const ref = getRef(userIds[userId])
        session.state = null
        await bot.deleteMessage(chatId, messageId)
        return bot.sendMessage(chatId, `👨‍💼- ${ref.last_reset} чел\n💰 - ${ref.last_reset * 6}₽`)
    }
    if (query.data === "look_stats_all") {
        const refs = getRefs()
        session.state = "RESET_REFS"

        let lastResetMessage = ``
        for (let i = 0; i < refs.length; i++) {
            if (!refs[i]) break;

            lastResetMessage += `${refs[i].name}: 👤${refs[i].last_reset}\n💰${refs[i].last_reset * 6}р\n\n`
        }

        let alwaysMessage = ``
        for (let i = 0; i < refs.length; i++) {
            if (!refs[i]) break;

            alwaysMessage += `${refs[i].name}: 👤${refs[i].always}\n\n`
        }
        await bot.sendMessage(chatId, `💸Ваши рефки с прошлого обнуления:\n\n${lastResetMessage}`, {
            reply_markup: resetRefsKeyboard()
        })
        await bot.sendMessage(chatId, `💸Ваши рефки за все время:\n\n${alwaysMessage}`)
        await bot.deleteMessage(chatId, messageId)
    }
}