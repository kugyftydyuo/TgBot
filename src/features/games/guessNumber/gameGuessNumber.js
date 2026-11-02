import {guessNumberKeyboard} from "../../../keyboards/guessNumber.js";
import {guessNumberPlayAgainKeyboard} from "../../../keyboards/guessNumberPlayAgain.js";
import {getMainBotSession} from "../../../state/mainBotSession.js";
import {msgIsNotModifiedError, updateBot} from "../../../consts/strings.js";
import {saveStats} from "../../../services/statsService.js";

export async function gameGuessNumber(bot, query) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const randomNumber = Math.floor(Math.random() * 10)

    const session = getMainBotSession(userId)
    session.randomNumber = randomNumber

    saveStats('guessNumber', userId)

    await bot.editMessageText(`<tg-emoji emoji-id=\'${emojis.lamp}\'>👍</tg-emoji> Я загадал цифру от <tg-emoji emoji-id=\'${emojis.num0}\'>👍</tg-emoji> до <tg-emoji emoji-id=\'${emojis.num9}\'>👍</tg-emoji>, попробуй ее угадать`, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: guessNumberKeyboard(),
        parse_mode: 'HTML'
    })
}

export async function guess(bot, query) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const session = getMainBotSession(userId)
    const number = Number(query.data.replace("guess_number_", ""))

    try {
        if (session.randomNumber === number) {
            await bot.editMessageText(`<tg-emoji emoji-id=\'${emojis.check}\'>👍</tg-emoji> Ты угадал(а)! Сыграть ещё раз?`, {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: guessNumberPlayAgainKeyboard(),
                parse_mode: 'HTML'
            })
        } else {
            await bot.editMessageText(`<tg-emoji emoji-id=\'${emojis.cross}\'>👍</tg-emoji> Ты не угадал(а). Загаданным числом было ${session.randomNumber}. Сыграть ещё раз?`, {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: guessNumberPlayAgainKeyboard(),
                parse_mode: 'HTML'
            })
        }
    } catch (e) {
        if (e.message !== msgIsNotModifiedError) {
            await bot.sendMessage(chatId, updateBot, {parse_mode: 'HTML'})
        }
    }
}