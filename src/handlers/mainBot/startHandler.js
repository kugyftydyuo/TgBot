import {startKeyboard} from '../../utils/keyboards.js'
import fs from 'fs'
import {HELLO_IMG_PATH} from "../../config/paths.js";
import {getUser} from "../../services/userService.js";

export async function startHandler(chatId, ref, userId, bot) {
    getUser(userId, ref)

    await bot.sendPhoto(chatId, fs.createReadStream(HELLO_IMG_PATH), {
        caption: "Добро пожаловат👋\nCпасибо что пользуешься нашим ботом🤜🤛\nЕсли вдруг бот тебе не отвечает попробуй перезапустить его",
    });
    await bot.sendMessage(chatId, "Для того чтобы отправить код подпишись на следующие каналы и нажми ✅Проверить", {
        reply_markup: startKeyboard()
    })
}