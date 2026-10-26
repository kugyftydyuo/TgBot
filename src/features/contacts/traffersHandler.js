import {msgIsNotModifiedError, updateBot} from "../../consts/strings.js";

export async function traffersHandler(msg, bot) {
    const chatId = msg.chat.id;

    try {
        await bot.sendMessage(chatId,'По поводу набора трафферов:\nhttps://t.me/nxtgoal');
    } catch (e) {
        if (e.message !== msgIsNotModifiedError) {
            await bot.sendMessage(chatId, updateBot)
        }
    }
}