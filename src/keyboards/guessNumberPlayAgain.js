export function guessNumberPlayAgainKeyboard() {
    return {
        inline_keyboard: [
            [{text: 'Играть еще раз', callback_data: 'start_game_guess_number'}],
            [{text: '↩Назад', callback_data: 'back'}]
        ]
    }
}