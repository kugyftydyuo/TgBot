export function editMovieKeyboard() {
    return {
        inline_keyboard: [
            [{text: "🗯 Название", callback_data: 'edit_movie_name'}],
            [{text: "✅ Готово", callback_data: 'edit_movie_is_ready'}]
        ]
    }
}