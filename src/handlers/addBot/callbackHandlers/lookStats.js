import {getRefs} from "../../../services/refsService.js";
import {userIds} from "../../../config/parallels.js";
import {getSession} from "../../../state/sessionAddBot.js";
import {resetRefsKeyboard} from "../../../utils/keyboards.js";

export async function lookStats(bot, chatId, userId, messageId, query) {
    const refs = getRefs()
    const session = getSession(userId)

    if (query.data === "look_stats_my") {
        session.state = null
        await bot.deleteMessage(chatId, messageId)
        return bot.sendMessage(chatId, `👨‍💼- ${refs[userIds[userId]]} чел\n💰 - ${refs[userIds[userId]] * 6}₽`)
    }
    if (query.data === "look_stats_all") {
        session.state = "RESET_REFS"
        const refsArr = Object.entries(refs)

        let lastResetMessage = ``
        for (let i = 0; i < refsArr.length; i++) {
            if (refsArr[i][0] === 'undefined') break;

            lastResetMessage += `${refsArr[i][0]}: 👤${refsArr[i][1].lastReset}\n💰${refsArr[i][1].lastReset * 6}р\n\n`
        }

        let alwaysMessage = ``
        for (let i = 0; i < refsArr.length; i++) {
            if (refsArr[i][0] === 'undefined') break;

            alwaysMessage += `${refsArr[i][0]}: 👤${refsArr[i][1].always}\n\n`
        }
        await bot.sendMessage(chatId, `💸Ваши рефки с прошлого обнуления:\n\n${lastResetMessage}`, {
            reply_markup: resetRefsKeyboard()
        })
        await bot.sendMessage(chatId, `💸Ваши рефки за все время:\n\n${alwaysMessage}`)
        await bot.deleteMessage(chatId, messageId)
    }
}