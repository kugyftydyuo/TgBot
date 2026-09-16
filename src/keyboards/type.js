export function typeKeyboard() {
    return {
        inline_keyboard: [
            [{text: "🌅 Аниме", callback_data: "type_anime"}, {text: "🌄 Фильм", callback_data: "type_film"}],
            [{text: "🌠 Сериал", callback_data: "type_serial"}]
        ]
    }
}