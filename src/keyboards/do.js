export function doKeyboard() {
    return {
        inline_keyboard: [
            [{text: 'Поиск по коду🔎', callback_data: 'search'}],
            [{text: 'Рандомное аниме🎲', callback_data: 'search_random_anime'}],
            [{text: 'Рандомный фильм🎲', callback_data: 'search_random_film'}],
            [{text: 'Поиск по жанру🔎', callback_data: 'search_genre'}],
            [{text: 'Игра: "Угадай число" 🎮', callback_data: 'start_game_guess_number'}],
            [{text: "🛍️Скупка трафика", callback_data: 'buy_traffic_is_sub'}],
            [{text: '👨‍🔧Tех. поддержка', callback_data: 'support_is_sub'}],
            [{text: '🤝Сотрудничество (реклама)', callback_data: 'support_ad_is_sub'}]
        ]
    }
}