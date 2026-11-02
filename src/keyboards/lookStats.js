import {emojis} from "../config/emojis.js";

export function lookStatsKeyboard() {
    return {
        inline_keyboard: [
            [{text: 'Себя', icon_custom_emoji_id: emojis.one, callback_data: 'look_stats_my'}, {text: 'Всех', icon_custom_emoji_id: emojis.many, callback_data: 'look_stats_all'}]
        ]
    }
}