import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'
import {startHandler} from "./startHandler.js";
import {addHandler} from "../../features/movie/add/addHandler.js";
import {statsHandler} from "../../features/statistics/statsHandler.js";
import {lookHandler} from "../../features/movie/look/lookHandler.js";
import {deleteHandler} from "../../features/movie/delete/deleteHandler.js";
import {editHandler} from "../../features/movie/edit/editHandler.js";
import {callbackRouter} from "../../routers/add/callbackRouter.js";
import {messageRouter} from "../../routers/add/messageRouter.js";
import {addCodeHandler} from "../../features/movie/add/addCodeHandler.js";

const bot = new TelegramBot(process.env.ADD_BOT_TOKEN, {polling: true})

bot.setMyCommands([
    {command: "/start", description: "Если пропали кнопки"},
])

bot.onText(/\/start/, msg => startHandler(msg.chat.id, bot, msg.from.id))

bot.onText("➕ Добавить",(msg) => addHandler(msg, bot));

bot.onText("📋 Посмотреть статистику", msg => statsHandler(bot, msg.from.id, msg.chat.id))

bot.onText("❗ Посмотреть информацию", (msg) => lookHandler(msg, bot))

bot.onText("♻ Удалить", (msg) => deleteHandler(msg, bot))

bot.onText("🛠 Изменить", (msg) => editHandler(msg, bot))

bot.onText("🆔 Добавить по коду", (msg) => addCodeHandler(msg, bot))

bot.on('message', (msg) => messageRouter(msg, bot))

bot.on('callback_query', query => callbackRouter(query, bot))