import {startKeyboard} from '../../keyboards/start.js'
import {HELLO_IMG_PATH} from "../../config/paths.js";
import {getUser} from "../../services/userService.js";
import {startUnderPhotoKeyboard} from "../../keyboards/startUnderPhoto.js";
import {emojis} from "../../config/emojis.js";

export async function startHandler(chatId, ref, userId, bot) {
    getUser(userId, ref)

    try {
        await bot.sendPhoto(chatId, HELLO_IMG_PATH, {
            caption: `<tg-emoji emoji-id='${emojis.hello}'>👋</tg-emoji>  Добро пожаловать!\n\n<tg-emoji emoji-id='${emojis.wifi}'>🎥</tg-emoji> Я помогу тебе найти нужное название по <b>коду</b> из описания видео`,
            parse_mode: 'HTML',
            reply_markup: startUnderPhotoKeyboard()
        });
    } catch (e) {
        console.log(e)
    }
    await bot.sendMessage(chatId, `<tg-emoji emoji-id='${emojis.square_message}'>👍</tg-emoji> Для того чтобы получить название подпишись на следующие каналы и нажми <tg-emoji emoji-id='${emojis.check}'>👍</tg-emoji> Проверить`, {
        reply_markup: startKeyboard(),
        parse_mode: 'HTML'
    })
}