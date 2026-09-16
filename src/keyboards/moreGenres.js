export function moreGenresKeyboard() {
    return {
        inline_keyboard: [
            [{text: "➕ Добавить еще жанр", callback_data: "more_genre_on"}],
            [{text: "▶ Далее", callback_data: "more_genre_off"}]
        ]
    }
}