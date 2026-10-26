import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'
import {startHandler} from "./startHandler.js";
import {messageRouter} from "../../routers/main/messageRouter.js";
import {callbackRouter} from "../../routers/main/callbackRouter.js";
import {chatJoinRequestHandler} from "./chatJoinRequestHandler.js";
import "../../mailing/sheduler.js"
import {traffersHandler} from "../../features/contacts/traffersHandler.js";

const bot = new TelegramBot(process.env.ANIME_BOT_TOKEN, {polling: true})

bot.setMyCommands([
    {command: "/start", description: "Перезапуск бота / Вызов главного меню"},
])

bot.onText(/\/start(?: (.+))?/, (msg, match) => startHandler(msg.chat.id, match[1], msg.from.id, bot))

bot.onText("🤝Набор трафферов", (msg) => traffersHandler(msg, bot))

bot.on('message', msg => messageRouter(msg, bot))

bot.on('callback_query', (query) => callbackRouter(query, bot))

bot.on('polling_error', console.log);

process.on('unhandledRejection', console.error);

bot.on('photo', (msg) => {
    const photo = msg.photo[msg.photo.length - 1];
    console.log('Ваш file_id:', photo.file_id);
});

bot.on('chat_join_request', (request) => chatJoinRequestHandler(request.from.id, request.invite_link.name));