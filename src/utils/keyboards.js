function startKeyboard() {
    return {
        inline_keyboard: [
            [{text: 'sponsor1', url: "https://t.me/+cqkrYv1GR4dlNGVi"}, {text: 'sponsor2', url: "https://t.me/+X689MU1msFY3ZjQy"}],
            [{text: '✅Проверить', callback_data: "check"}],
            [{text: '👨‍🔧Сотрудничество', callback_data: 'support'}]
        ],
    }
}

function foundFilmKeyboard() {
    return {
        inline_keyboard: [
            [{text: 'Найти фильм-аниме🎥', callback_data: 'search'}],
        ]
    }
}

function foundFilmAndBackKeyboard() {
    return {
        inline_keyboard: [
            [{text: 'Найти фильм-аниме🎥', callback_data: 'search'}],
            [{text: '↩Назад', callback_data: 'back'}]
        ]
    }
}

function doKeyboard() {
    return {
        inline_keyboard: [
            [{text: 'Найти фильм-аниме🎥', callback_data: 'search'}],
            [{text: 'Рандомное аниме🎲', callback_data: 'search_random'}],
            [{text: 'Искать по жанру🔎', callback_data: 'search_genre'}]
        ]
    }
}

function checkKeyboard() {
    return {
        inline_keyboard: [
            [{text: 'Проверить подписку', callback_data: 'back_support'}]
        ]
    }
}

function backSupportKeyboard() {
    return {
        inline_keyboard: [
            [{text: '↩Назад', callback_data: 'back_support'}]
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

function addBotKeyboard() {
    return {
        resize_keyboard: true,
        keyboard: [
            [{text: "/stats"}, {text: "/help"}]
        ]
    }
}

function genreKeyboard() {
    return {
        inline_keyboard: [
            [{text: "Романтика", callback_data: 'romance'}],
        ]
    }
}

function searchGenreKeyboard() {
    return {
        inline_keyboard: [
            [{text: "Романтика", callback_data: 'search_romance'}],
            [{text: '↩Назад', callback_data: 'back'}]
        ]
    }
}

export {
    startKeyboard,
    foundFilmAndBackKeyboard,
    doKeyboard,
    checkKeyboard,
    backSupportKeyboard,
    addBotKeyboard,
    genreKeyboard,
    foundFilmKeyboard,
    searchGenreKeyboard,
    backKeyboard
}