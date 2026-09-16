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

    await bot.editMessageText('Я загадал цифру от 0 до 9, попробуй ее угадать', {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: guessNumberKeyboard()
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
            await bot.editMessageText('✅ Ты угадал(а)! Сыграть ещё раз?', {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: guessNumberPlayAgainKeyboard()
            })
        } else {
            await bot.editMessageText(`❌ Ты не угадал(а). Загаданным числом было ${session.randomNumber}. Сыграть ещё раз?`, {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: guessNumberPlayAgainKeyboard()
            })
        }
    } catch (e) {
        if (e.message !== msgIsNotModifiedError) {
            await bot.sendMessage(chatId, updateBot)
        }
    }
}