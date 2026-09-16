export function foundFilmKeyboard() {
    return {
        inline_keyboard: [
            [{text: 'Поиск по коду🔎', callback_data: 'search'}],
        ]
    }
}