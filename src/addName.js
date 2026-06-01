import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'
import {startHandler} from "./handlers/addBot/startHandler.js";
import {addHandler} from "./handlers/addBot/addHandler.js";
import {statsHandler} from "./handlers/addBot/statsHandler.js";
import {lookHandler} from "./handlers/addBot/lookHandler.js";
import {deleteHandler} from "./handlers/addBot/deleteHandler.js";
import {editHandler} from "./handlers/addBot/editHandler.js";
import {callbackHandler} from "./handlers/addBot/callbackHandler.js";
import {messageHandler} from "./handlers/addBot/messageHandler.js";

const bot = new TelegramBot(process.env.ADD_BOT_TOKEN, {polling: true})

bot.onText(/\/start/, msg => startHandler(msg.chat.id, bot, msg.from.id))

bot.onText("➕ Добавить",(msg) => addHandler(msg, bot));

bot.onText("📋 Посмотреть статистику", msg => statsHandler(bot, msg.from.id, msg.chat.id))

bot.onText("❗ Посмотреть информацию", (msg, match) => lookHandler(msg, bot, match.input))

bot.onText("♻ Удалить", (msg, match) => deleteHandler(msg, bot, match.input))

bot.onText("🛠 Изменить", (msg, match) => editHandler(msg, bot, match.input))

bot.on('message', (msg) => messageHandler(msg, bot))

bot.on('callback_query', query => callbackHandler(query, bot))