export const updateBot = '⚠ Бот был обновлён. Перезапусти его через команду /start'

export const buttons = ["➕ Добавить", "♻ Удалить", "🛠 Изменить", "📋 Посмотреть статистику", "❗ Посмотреть информацию"]

export const msgIsNotModifiedError = 'ETELEGRAM: 400 Bad Request: message is not modified: specified new message content and reply markup are exactly the same as a current content and reply markup of the message'

export function moviesList(movie) {
    return `🗯 Название: ${movie.name}\n📒 Кол-во серий: ${movie.episodes}\n🎬 Жанр: ${movie.genre}\n🔑 Тип: ${movie.type}\n\n`
}