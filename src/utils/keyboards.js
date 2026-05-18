function startKeyboard() {
    return {
        inline_keyboard: [
            [{text: 'sponsor1', url: "https://t.me/+cqkrYv1GR4dlNGVi"}, {text: 'sponsor2', url: "https://t.me/+X689MU1msFY3ZjQy"}],
            [{text: '✅Проверить', callback_data: "check"}],
            [{text: '👨‍🔧Сотрудничество', callback_data: 'support'}]
        ],
    }
}

function afterWritingCodeKeyboard() {
    return {
        inline_keyboard: [
            [{text: 'Найти фильм-аниме🎥', callback_data: 'search'}],
            [{text: '↩Назад', callback_data: 'back'}]
        ]
    }
}

function foundFilmKeyboard() {
    return {
        inline_keyboard: [
            [{text: 'Найти фильм-аниме🎥', callback_data: 'search'}]
        ]
    }
}

function checkKeyboard() {
    return {
        inline_keyboard: [
            [{text: 'Проверить подписку', callback_data: 'back'}]
        ]
    }
}

function backKeyboard() {
    return {
        inline_keyboard: [
            [{text: '↩Назад', callback_data: 'back'}]
        ]
    }
}

export {
    startKeyboard,
    afterWritingCodeKeyboard,
    foundFilmKeyboard,
    checkKeyboard,
    backKeyboard
}