export function animeGenreKeyboard() {
    return {
        inline_keyboard: [
            [{text: "❤ Романтика", callback_data: 'romance'}, {text: "🪬 Исекай", callback_data: 'issekai'}],
            [{text: "🤝 Сенэн", callback_data: 'senen'}, {text: "✈ Приключение", callback_data: 'adventure'}],
            [{text: "😢 Драма", callback_data: 'drama'}, {text: "😝 Комедия", callback_data: 'comedy'}],
            [{text: "🥇 Спорт", callback_data: 'sport'}, {text: "🔮 Фантастика", callback_data: 'fantasy'}],
            [{text: "🥪 Повседневка", callback_data: 'everyday'}]
        ]
    }
}