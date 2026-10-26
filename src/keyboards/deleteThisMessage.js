export function deleteThisMessage() {
    return {
        inline_keyboard: [
            [{text: '🚫 Удалить это сообщение', callback_data: "delete_this_message"}],
        ]
    }
}