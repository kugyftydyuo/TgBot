export function deleteThisMessage(bot, query) {
    bot.deleteMessage(query.message.chat.id, query.message.message_id)
}