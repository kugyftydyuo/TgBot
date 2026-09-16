export function editMovieKeyboard() {
    return {
        inline_keyboard: [
            [{text: "🗯 Название", callback_data: 'edit_movie_name'}],
            [{text: "🎬 Жанр", callback_data: 'edit_movie_genre'}, {text: "🔑 Тип", callback_data: 'edit_movie_type'}],
            [{text: "✅ Готово", callback_data: 'edit_movie_is_ready'}]
        ]
    }
}