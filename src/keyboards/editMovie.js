import {emojis} from "../config/emojis.js";

export function editMovieKeyboard() {
    return {
        inline_keyboard: [
            [{text: "Название", icon_custom_emoji_id: emojis.message, callback_data: 'edit_movie_name'}],
            [{text: "Готово", icon_custom_emoji_id: emojis.check3, callback_data: 'edit_movie_is_ready'}]
        ]
    }
}