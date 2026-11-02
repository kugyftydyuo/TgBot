import {emojis} from "../config/emojis.js";

export function startKeyboard() {
    return {
        inline_keyboard: [
            [{text: 'Подписаться', icon_custom_emoji_id: emojis.link, url: "https://t.me/+niZuDmFDwPE4ZDMy"}],
            [{text: 'Подписаться', icon_custom_emoji_id: emojis.link, url: "https://t.me/kinostasis"}],
            [{text: 'Проверить', icon_custom_emoji_id: emojis.check, callback_data: "check"}],
            //[{text: "🤝Набор трафферов", callback_data: "buy_traffic"}],
            //[{text: '🛍️Скупка, продажа трафика', callback_data: 'support_ad'}]
        ]
    }
}