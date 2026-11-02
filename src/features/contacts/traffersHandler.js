import {msgIsNotModifiedError, updateBot} from "../../consts/strings.js";
import {emojis} from "../../config/emojis.js";

export async function traffersHandler(msg, bot) {
    const chatId = msg.chat.id;

    try {
        await bot.sendMessage(chatId,`<tg-emoji emoji-id=\'${emojis.eye}\'>👍</tg-emoji> По поводу набора трафферов:\nhttps://t.me/nxtgoal`, {parse_mode: 'HTML'});
    } catch (e) {
        if (e.message !== msgIsNotModifiedError) {
            await bot.sendMessage(chatId, updateBot, {parse_mode: 'HTML'})
        }
    }
}