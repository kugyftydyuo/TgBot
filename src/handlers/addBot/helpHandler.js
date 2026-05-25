import {admins, workers} from "../../config/workers.js";

export function helpHandler(chatId, userId, bot) {
    if (admins.includes(userId)) {
        return bot.sendMessage(chatId, 'Помощь по командам:\n' +
            '\n' +
            'Чтобы добавить фильм:\n' +
            '/add название\n' +
            '\n' +
            'Чтобы посмотреть статистику:\n' +
            '/stats\n' +
            '\n' +
            'Чтобы посмотреть какой фильм находится под определенным кодом:\n' +
            '/look код\n' +
            '\n' +
            'Чтобы увидеть весь список кодов и названий:\n' +
            '/look\n' +
            '\n' +
            'Чтобы удалить фильм:\n' +
            '/delete код_фильма_который_нужно_удалить\n' +
            '\n' +
            'Чтобы изменить название фильма под определенным кодом:\n' +
            '/edit код_фильма_который_нужно_поменять новое_название_фильма')
    } else if (workers.includes(userId)){
        return bot.sendMessage(chatId, 'Помощь по командам:\n' +
            '\n' +
            'Чтобы добавить фильм:\n' +
            '/add название\n' +
            '\n' +
            'Чтобы посмотреть статистику:\n' +
            '/stats')
    } else {
        return bot.sendMessage(chatId, '❌ Нет доступа')
    }
}