import {guessNumberKeyboard, guessNumberPlayAgain} from "../../../utils/keyboards.js";
import {getUserOptions, setUserRandomNumber} from "../../../state/session.js";
import {msgIsNotModifiedError, updateBot} from "../../../config/strings.js";
import {saveStats} from "../../../services/statsService.js";

export async function gameGuessNumber(chatId, bot, messageId, userId) {
    const randomNumber = Math.floor(Math.random() * 10)
    setUserRandomNumber(userId, randomNumber)
    saveStats('guessNumber', userId)

    await bot.editMessageText('Я загадал цифру от 0 до 9, попробуй ее угадать', {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: guessNumberKeyboard()
    })
}

export async function guess(chatId, bot, userId, callData, messageId) {
    const userOptions = getUserOptions(userId)
    const number = Number(callData.slice(13, callData.length))

    try {
        if (userOptions.randomNumber === number) {
            await bot.editMessageText('✅ Ты угадал(а)! Сыграть ещё раз?', {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: guessNumberPlayAgain()
            })
        } else {
            await bot.editMessageText(`❌ Ты не угадал(а). Загаданным числом было ${userOptions.randomNumber}. Сыграть ещё раз?`, {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: guessNumberPlayAgain()
            })
        }
    } catch (e) {
        if (e.message !== msgIsNotModifiedError) {
            await bot.sendMessage(chatId, updateBot)
        }
    }
}