import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'
import {startHandler} from "./handlers/mainBot/startHandler.js";
import {messageHandler} from "./handlers/mainBot/messageHandler.js";
import {callbackHandler} from "./handlers/mainBot/callbackHandler.js";

const bot = new TelegramBot(process.env.ANIME_BOT_TOKEN, {polling: true})

bot.onText(/\/start(?: (.+))?/, (msg, match) => startHandler(msg.chat.id, match[1], msg.from.id, bot))

bot.on('message', msg => messageHandler(msg.chat.id, msg.text, msg.message_id, msg.from.id, bot))

bot.on('callback_query', (query) => callbackHandler(query, bot))

bot.on('polling_error', console.log);

process.on('unhandledRejection', console.error);

bot.on('photo', (msg) => {
    // Массив разных размеров картинки. Берем последний (самый большой)
    const photo = msg.photo[msg.photo.length - 1];
    console.log('Ваш file_id:', photo.file_id);
});