export function guessNumberKeyboard() {
    return {
        inline_keyboard: [
            [{text: '1', callback_data: 'guess_number_1'}, {text: '2', callback_data: 'guess_number_2'}, {text: '3', callback_data: 'guess_number_3'}],
            [{text: '4', callback_data: 'guess_number_4'}, {text: '5', callback_data: 'guess_number_5'}, {text: '6', callback_data: 'guess_number_6'}],
            [{text: '7', callback_data: 'guess_number_7'}, {text: '8', callback_data: 'guess_number_8'}, {text: '9', callback_data: 'guess_number_9'}],
            [{text: '0', callback_data: 'guess_number_0'}],
        ]
    }
}