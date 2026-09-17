export function confirmResetRefsKeyboard() {
    return {
        inline_keyboard: [
            [{text: "✅Да", callback_data: "reset_refs_yes", style: "success"}, {text: "❌Нет", callback_data: "reset_refs_no", style: "danger"}]
        ]
    }
}