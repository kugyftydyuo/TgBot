export function lookMoviesKeyboard() {
    return {
        inline_keyboard: [
            [{text: '📚 Все', callback_data: 'look_all'}, {text: '📔 Один', callback_data: 'look_one'}]
        ]
    }
}