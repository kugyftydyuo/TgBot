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
            [{text: 'Поиск по коду🔎', callback_data: 'search'}],
        ]
    }
}

function doKeyboard() {
    return {
        inline_keyboard: [
            [{text: 'Поиск по коду🔎', callback_data: 'search'}],
            [{text: 'Рандомное аниме🎲', callback_data: 'search_random'}],
            [{text: 'Поиск по жанру🔎', callback_data: 'search_genre'}],
            [{text: '👨‍🔧Сотрудничество', callback_data: 'support_is_sub'}]
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
            [{text: "➕ Добавить"}],
            [{text: "📋 Посмотреть статистику"}]
        ]
    }
}

function addBotForAdminsKeyboard() {
    return {
        resize_keyboard: true,
        keyboard: [
            [{text: "➕ Добавить"}, {text: "♻ Удалить"}],
            [{text: "🛠 Изменить"}],
            [{text: "📋 Посмотреть статистику"}],
            [{text: "❗ Посмотреть информацию"}]
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

function editMovieKeyboard() {
    return {
        inline_keyboard: [
            [{text: "🗯 Название", callback_data: 'edit_movie_name'}, {text: "📒 Кол-во серий", callback_data: 'edit_movie_episodes'}],
            [{text: "🎬 Жанр", callback_data: 'edit_movie_genre'}],
            [{text: "✅ Готово", callback_data: 'edit_movie_is_ready'}]
        ]
    }
}

function lookMoviesKeyboard() {
    return {
        inline_keyboard: [
            [{text: '📚 Все', callback_data: 'look_all'}, {text: '📔 Один', callback_data: 'look_one'}]
        ]
    }
}

export {
    startKeyboard,
    doKeyboard,
    checkKeyboard,
    backSupportKeyboard,
    addBotKeyboard,
    addBotForAdminsKeyboard,
    genreKeyboard,
    foundFilmKeyboard,
    searchGenreKeyboard,
    backKeyboard,
    editMovieKeyboard,
    lookMoviesKeyboard
}