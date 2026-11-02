import {emojis} from "../config/emojis.js";

export function backKeyboard(isSupport) {
    if (isSupport) {
        return {
            inline_keyboard: [
                [{text: 'Назад', icon_custom_emoji_id: emojis.back, callback_data: 'back_to_main'}]
            ]
        }
    } else {
        return {
            inline_keyboard: [
                [{text: 'Назад', icon_custom_emoji_id: emojis.back, callback_data: 'back'}]
            ]
        }
    }
}