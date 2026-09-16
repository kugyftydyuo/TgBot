export function searchGenreKeyboard() {
    return {
        inline_keyboard: [
            [{text: "❤ Романтика", callback_data: 'search_genre_romance'}, {text: "🪬 Исекай", callback_data: 'search_genre_issekai'}],
            [{text: "🤝 Сенэн", callback_data: 'search_genre_senen'}, {text: "✈ Приключение", callback_data: 'search_genre_adventure'}],
            [{text: "😢 Драма", callback_data: 'search_genre_drama'}, {text: "😝 Комедия", callback_data: 'search_genre_comedy'}],
            [{text: "🥇 Спорт", callback_data: 'search_genre_sport'}, {text: "🔮 Фэнтези", callback_data: 'search_genre_fantasy'}],
            [{text: "🔎 Детектив", callback_data: 'search_genre_detective'}, {text: "💣 Боевик", callback_data: 'search_genre_actionMovie'}],
            [{text: "🥪 Повседневка", callback_data: 'search_genre_everyday'}, {text: "☢ Триллер", callback_data: 'search_genre_triller'}],
            [{text: "👹 Хоррор", callback_data: 'search_genre_horror'}],
            [{text: '↩Назад', callback_data: 'back'}]
        ]
    }
}