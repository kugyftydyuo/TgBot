import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'
import {startHandler} from "./handlers/startHandler.js";
import {messageHandler} from "./handlers/messageHandler.js";
import {callbackHandler} from "./handlers/callbackHandler.js";

const bot = new TelegramBot(process.env.MAIN_BOT_TOKEN, {polling: true})

bot.onText(/\/start(?: (.+))?/, (msg, match) => startHandler(msg.chat.id, match[1], msg.from.id, bot))

bot.on('message', msg => messageHandler(msg.chat.id, msg.text, msg.message_id, msg.from.id, bot))

bot.on('callback_query', (query) => callbackHandler(query, bot))