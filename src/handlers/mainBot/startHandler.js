import {startKeyboard} from '../../utils/keyboards.js'
import {HELLO_IMG_PATH} from "../../config/paths.js";
import {getUser} from "../../services/userService.js";

export async function startHandler(chatId, ref, userId, bot) {
    getUser(userId, ref)

    try {
        await bot.sendPhoto(chatId, HELLO_IMG_PATH, {
            caption: "Добро пожаловать👋\nCпасибо что пользуешься нашим ботом🤜🤛",
        });
    } catch (e) {
        console.log(e)
    }
    await bot.sendMessage(chatId, "Для того чтобы отправить код подпишись на следующиe каналы и нажми ✅Проверить", {
        reply_markup: startKeyboard()
    })
}