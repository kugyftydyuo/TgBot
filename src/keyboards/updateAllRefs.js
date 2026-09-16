export function updateAllRefsKeyboard() {
    return {
        inline_keyboard: [
            [{text: "🆙 Обновить стату", callback_data: "updateRefs_always"}]
        ]
    }
}