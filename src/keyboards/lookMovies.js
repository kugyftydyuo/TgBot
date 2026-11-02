import {emojis} from "../config/emojis.js";

export function lookMoviesKeyboard() {
    return {
        inline_keyboard: [
            [{text: 'Все', icon_custom_emoji_id: emojis.many, callback_data: 'look_all'}, {text: 'Один', icon_custom_emoji_id: emojis.one, callback_data: 'look_one'}]
        ]
    }
}