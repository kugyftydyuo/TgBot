import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'
import {startHandler} from "./handlers/addBot/startHandler.js";
import {addHandler} from "./handlers/addBot/addHandler.js";
import {statsHandler} from "./handlers/addBot/statsHandler.js";
import {helpHandler} from "./handlers/addBot/helpHandler.js";
import {lookHandler} from "./handlers/addBot/lookHandler.js";
import {deleteHandler} from "./handlers/addBot/deleteHandler.js";
import {editHandler} from "./handlers/addBot/editHandler.js";

const bot = new TelegramBot(process.env.ADD_BOT_TOKEN, {polling: true})

bot.setMyCommands([
    {command: "/stats", description: "Посмотреть свою статистику"},
    {command: "/help", description: "Помощь по командам"},
])

bot.onText(/\/start/, msg => startHandler(msg.chat.id, bot))

bot.onText(/\/add/, async (msg, match) => addHandler(msg, bot, match.input));

bot.onText(/\/stats/, msg => statsHandler(bot, msg.from.id, msg.chat.id))

bot.onText(/\/help/, msg => helpHandler(msg.chat.id, msg.from.id, bot))

bot.onText(/\/look/, (msg, match) => lookHandler(msg, bot, match.input))

bot.onText(/\/delete/, (msg, match) => deleteHandler(msg, bot, match.input))

bot.onText(/\/edit/, (msg, match) => editHandler(msg, bot, match.input))