import {emojis} from "../config/emojis.js";

export function confirmResetRefsKeyboard() {
    return {
        inline_keyboard: [
            [{text: "Да", icon_custom_emoji_id: emojis.check3, callback_data: "reset_refs_yes", style: "success"}, {text: "Нет", icon_custom_emoji_id: emojis.cross2, callback_data: "reset_refs_no", style: "danger"}]
        ]
    }
}