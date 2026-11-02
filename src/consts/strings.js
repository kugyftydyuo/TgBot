import {emojis} from "../config/emojis.js";

export const updateBot = `<tg-emoji emoji-id=\'${emojis.warning}\'>⚠</tg-emoji> Бот был обновлён. Перезапусти его через команду /start`

export const buttons = ["➕ Добавить", "♻ Удалить", "🛠 Изменить", "📋 Посмотреть статистику", "❗ Посмотреть информацию", "🆔 Добавить по коду"]

export const msgIsNotModifiedError = 'ETELEGRAM: 400 Bad Request: message is not modified: specified new message content and reply markup are exactly the same as a current content and reply markup of the message'

export function moviesList(movie) {
    return `<tg-emoji emoji-id=\'${emojis.message}\'>⚠</tg-emoji> Название: ${movie.name}\n\n`
}