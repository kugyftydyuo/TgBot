import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'
import {startHandler} from "./handlers/addBot/startHandler.js";
import {addHandler} from "./handlers/addBot/addHandler.js";
import {statsHandler} from "./handlers/addBot/statsHandler.js";

const bot = new TelegramBot(process.env.ADD_BOT_TOKEN, {polling: true})

bot.setMyCommands([
    {command: "/stats", description: "Посмотреть свою статистику"},
])

bot.onText(/\/start/, msg => startHandler(msg.chat.id, bot))

bot.onText(/\/add (.+)/, async (msg, match) => addHandler(msg, bot, match[1]));

bot.onText(/\/stats/, msg => statsHandler(bot, msg.from.id, msg.chat.id))