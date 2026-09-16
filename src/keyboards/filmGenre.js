export function filmGenreKeyboard() {
    return {
        inline_keyboard: [
            [{text: "👹 Хоррор", callback_data: 'horror'}, {text: "💣 Боевик", callback_data: 'actionMovie'}],
            [{text: "🔎 Детектив", callback_data: 'detective'}, {text: "☢ Триллер", callback_data: 'triller'}],
            [{text: "😢 Драма", callback_data: 'drama'}, {text: "😝 Комедия", callback_data: 'comedy'}],
            [{text: "❤ Романтика", callback_data: 'romance'}, {text: "🔮 Фантастика", callback_data: 'fantasy'}]
        ]
    }
}