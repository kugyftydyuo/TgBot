import {startKeyboard} from '../utils/keyboards.js'
import fs from 'fs'
import {setRef} from "../services/refsService.js";
import {HELLO_IMG_PATH} from "../config/paths.js";

export async function startHandler(chatId, ref, userId, bot) {
    setRef(ref, userId)

    await bot.sendPhoto(chatId, fs.createReadStream(HELLO_IMG_PATH), {
        caption: "Добро пожаловать👋\nCпасибо что пользуешься нашим ботом🤜🤛",
    });
    await bot.sendMessage(chatId, "Для того чтобы отправить код подпишись на следующие каналы и нажми ✅Проверить", {
        reply_markup: startKeyboard()
    })
}