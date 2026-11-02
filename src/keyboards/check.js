import {emojis} from "../config/emojis.js";

export function checkKeyboard() {
    return {
        inline_keyboard: [
            [{text: 'Проверить подписку', icon_custom_emoji_id: emojis.man_plus, callback_data: 'back_to_main'}]
        ]
    }
}