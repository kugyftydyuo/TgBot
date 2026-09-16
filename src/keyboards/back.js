export function backKeyboard(isSupport) {
    if (isSupport) {
        return {
            inline_keyboard: [
                [{text: '↩Назад', callback_data: 'back_to_main'}]
            ]
        }
    } else {
        return {
            inline_keyboard: [
                [{text: '↩Назад', callback_data: 'back'}]
            ]
        }
    }
}