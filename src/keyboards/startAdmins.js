export function startAdminsKeyboard() {
    return {
        resize_keyboard: true,
        keyboard: [
            [{text: "➕ Добавить"}, {text: "♻ Удалить"}],
            [{text: "🛠 Изменить"}],
            [{text: "📋 Посмотреть статистику"}],
            [{text: "❗ Посмотреть информацию"}],
            [{text: "🆔 Добавить по коду"}]
        ]
    }
}