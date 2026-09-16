export function resetRefsKeyboard() {
    return {
        inline_keyboard: [
            [{text: "🔄 Обнулить рефки", callback_data: "resetRefs"}],
            [{text: "🆙 Обновить стату", callback_data: "updateRefs_lastReset"}]
        ]
    }
}