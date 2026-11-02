import {emojis} from "../config/emojis.js";

export function updateAllRefsKeyboard() {
    return {
        inline_keyboard: [
            [{text: "Обновить стату", icon_custom_emoji_id: emojis.update, callback_data: "updateRefs_always"}]
        ]
    }
}