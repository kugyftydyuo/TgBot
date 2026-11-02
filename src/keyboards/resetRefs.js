import {emojis} from "../config/emojis.js";

export function resetRefsKeyboard() {
    return {
        inline_keyboard: [
            [{text: "Обнулить рефки", icon_custom_emoji_id: emojis.reset, callback_data: "resetRefs"}],
            [{text: "Обновить стату", icon_custom_emoji_id: emojis.update, callback_data: "updateRefs_lastReset"}]
        ]
    }
}