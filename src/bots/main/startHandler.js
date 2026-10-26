import {startKeyboard} from '../../keyboards/start.js'
import {HELLO_IMG_PATH} from "../../config/paths.js";
import {getUser} from "../../services/userService.js";
import {startUnderPhotoKeyboard} from "../../keyboards/startUnderPhoto.js";

export async function startHandler(chatId, ref, userId, bot) {
    getUser(userId, ref)

    try {
        await bot.sendPhoto(chatId, HELLO_IMG_PATH, {
            caption: "👋 Добро пожаловать!\n\n🎥Я помогу тебе найти нужное название по <b>коду</b> из описания видео",
            parse_mode: 'HTML',
            reply_markup: startUnderPhotoKeyboard()
        });
    } catch (e) {
        console.log(e)
    }
    await bot.sendMessage(chatId, "Для того чтобы получить название подпишись на следующие каналы и нажми ✅Проверить", {
        reply_markup: startKeyboard(),
        parse_mode: 'HTML'
    })
}