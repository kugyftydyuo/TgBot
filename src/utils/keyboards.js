function startKeyboard() {
    return {
        inline_keyboard: [
            [{text: '➕ Подписаться', url: "https://t.me/+cqkrYv1GR4dlNGVi"}],
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
            [{text: 'Рандомное аниме🎲', callback_data: 'search_random_anime'}],
            [{text: 'Рандомная дорама🎲', callback_data: 'search_random_dorama'}],
            [{text: 'Поиск по жанру🔎', callback_data: 'search_genre'}],
            [{text: 'Игра: "Угадай число" 🎮', callback_data: 'start_game_guess_number'}],
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

function backKeyboard(isSupport) {
    if (isSupport) {
        return {
            inline_keyboard: [
                [{text: '↩Назад', callback_data: 'back_support'}]
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
            [{text: "❗ Посмотреть информацию"}],
            [{text: "🔄 Обнулить рефки"}]
        ]
    }
}

function animeGenreKeyboard() {
    return {
        inline_keyboard: [
            [{text: "❤ Романтика", callback_data: 'romance'}, {text: "🪬 Исекай", callback_data: 'issekai'}],
            [{text: "🤝 Сенэн", callback_data: 'senen'}, {text: "✈ Приключение", callback_data: 'adventure'}],
            [{text: "😢 Драма", callback_data: 'drama'}, {text: "😝 Комедия", callback_data: 'comedy'}],
            [{text: "🥇 Спорт", callback_data: 'sport'}, {text: "🔮 Фэнтези", callback_data: 'fantasy'}],
            [{text: "🥪 Повседневка", callback_data: 'everyday'}]
        ]
    }
}

function doramaGenreKeyboard() {
    return {
        inline_keyboard: [
            [{text: "❤ Романтика", callback_data: 'romance'}, {text: "❤😝 РомКом", callback_data: 'romkom'}],
            [{text: "🔎 Детектив", callback_data: 'detective'}, {text: "⌛ Исторический", callback_data: 'history'}],
            [{text: "😢 Драма", callback_data: 'drama'}, {text: "😝 Комедия", callback_data: 'comedy'}],
            [{text: "🔮 Фантастика и Мистика", callback_data: 'fantasyAndMystic'}]
        ]
    }
}

function searchGenreKeyboard() {
    return {
        inline_keyboard: [
            [{text: "❤ Романтика", callback_data: 'search_genre_romance'}, {text: "🪬 Исекай", callback_data: 'search_genre_issekai'}],
            [{text: "🤝 Сенэн", callback_data: 'search_genre_senen'}, {text: "✈ Приключение", callback_data: 'search_genre_adventure'}],
            [{text: "😢 Драма", callback_data: 'search_genre_drama'}, {text: "😝 Комедия", callback_data: 'search_genre_comedy'}],
            [{text: "🥇 Спорт", callback_data: 'search_genre_sport'}, {text: "🔮 Фэнтези", callback_data: 'search_genre_fantasy'}],
            [{text: "🔎 Детектив", callback_data: 'search_genre_detective'}, {text: "⌛ Исторический", callback_data: 'search_genre_history'}],
            [{text: "🥪 Повседневка", callback_data: 'search_genre_everyday'}, {text: "❤😝 РомКом", callback_data: 'search_genre_romkom'}],
            [{text: "🔮 Фантастика и Мистика", callback_data: 'search_genre_fantasyAndMystic'}],
            [{text: '↩Назад', callback_data: 'back'}]
        ]
    }
}

function editMovieKeyboard() {
    return {
        inline_keyboard: [
            [{text: "🗯 Название", callback_data: 'edit_movie_name'}, {text: "📒 Кол-во серий", callback_data: 'edit_movie_episodes'}],
            [{text: "🎬 Жанр", callback_data: 'edit_movie_genre'}, {text: "🔑 Тип", callback_data: 'edit_movie_type'}],
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

function guessNumberKeyboard() {
    return {
        inline_keyboard: [
            [{text: '1', callback_data: 'guess_number_1'}, {text: '2', callback_data: 'guess_number_2'}, {text: '3', callback_data: 'guess_number_3'}],
            [{text: '4', callback_data: 'guess_number_4'}, {text: '5', callback_data: 'guess_number_5'}, {text: '6', callback_data: 'guess_number_6'}],
            [{text: '7', callback_data: 'guess_number_7'}, {text: '8', callback_data: 'guess_number_8'}, {text: '9', callback_data: 'guess_number_9'}],
            [{text: '0', callback_data: 'guess_number_0'}],
        ]
    }
}

function guessNumberPlayAgain() {
    return {
        inline_keyboard: [
            [{text: 'Играть еще раз', callback_data: 'start_game_guess_number'}],
            [{text: '↩Назад', callback_data: 'back'}]
        ]
    }
}

function lookStatsKeyboard() {
    return {
        inline_keyboard: [
            [{text: '🏠 Себя', callback_data: 'look_stats_my'}, {text: '🏘 Всех', callback_data: 'look_stats_all'}]
        ]
    }
}

function typeKeyboard() {
    return {
        inline_keyboard: [
            [{text: "🌅 Аниме", callback_data: "type_anime"}, {text: "🌄 Дорама", callback_data: "type_dorama"}]
        ]
    }
}

function resetRefsKeyboard() {
    return {
        inline_keyboard: [
            [{text: "🔄 Обнулить рефки", callback_data: "resetRefs"}]
        ]
    }
}

export {
    startKeyboard,
    doKeyboard,
    checkKeyboard,
    addBotKeyboard,
    addBotForAdminsKeyboard,
    animeGenreKeyboard,
    doramaGenreKeyboard,
    foundFilmKeyboard,
    searchGenreKeyboard,
    backKeyboard,
    editMovieKeyboard,
    lookMoviesKeyboard,
    guessNumberKeyboard,
    guessNumberPlayAgain,
    lookStatsKeyboard,
    typeKeyboard,
    resetRefsKeyboard
}