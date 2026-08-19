import {getUserOptions} from "../../state/session.js";
import {waitingCode} from "./messageHandlers/waitingCode.js";
import {waitingCodeSecondTime} from "./messageHandlers/waitingCodeSecondTime.js";

export async function messageHandler(chatId, text, messageId, userId, bot) {
    const userOptions = getUserOptions(userId)

        if (userOptions.state === "WAITING_CODE") {
            waitingCode(bot, chatId, userId, text, messageId)
        } else {
            if (userOptions.state !== "WAITING_CODE_SECOND_TIME") {
                waitingCodeSecondTime(bot, chatId, userId, messageId)
            } else {
                await bot.deleteMessage(chatId, messageId)
            }
        }

        switch (userOptions.state) {
            case 'AI':
                console.log(2)
        }
}