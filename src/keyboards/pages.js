export function pagesKeyboard(length, type) {
    function createRow(start) {
        let row = []
        for (let i = start; i < Math.ceil(length / 5); i++) {
            if (row.length === 9) break
            row = [...row, {text: `${i + 1}`, callback_data: `page_${type}_${i + 1}`}]
        }
        return row
    }
    let buttons = []
    for (let i = 0; i < Math.ceil(length / 40); i++) {
        buttons = [
            ...buttons,
            createRow(i * 8),
        ]
    }
    buttons = [
        ...buttons,
        type === "genre" ? [{text: '↩Назад', callback_data: 'back'}] : null
    ]

    return {
        inline_keyboard: buttons
    }
}