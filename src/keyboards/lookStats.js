export function lookStatsKeyboard() {
    return {
        inline_keyboard: [
            [{text: '🏠 Себя', callback_data: 'look_stats_my'}, {text: '🏘 Всех', callback_data: 'look_stats_all'}]
        ]
    }
}