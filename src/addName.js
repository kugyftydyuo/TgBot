require('dotenv').config()
const TelegramApi = require('node-telegram-bot-api')
const fs = require("fs")
const token = process.env.ADD_BOT_TOKEN
const bot = new TelegramApi(token, {polling: true})

const admins = [5429133787, 8501167201, 1942693598]

bot.setMyCommands([
    {command: "/stats", description: "Посмотреть свою статистику"},
])

function addMovie(code, name) {
    const data = JSON.parse(fs.readFileSync("./movies.json", "utf8"));
    data[code] = name;
    fs.writeFileSync("./movies.json", JSON.stringify(data, null, 2));
}

bot.onText(/\/start/, msg => {
    return bot.sendMessage(msg.chat.id, "Добро пожаловать\nЗдесь вы можете добавить бота по коду\nДля того чтобы добавить бота напишите /add название")
})

bot.onText(/\/add (.+)/, async (msg, match) => {
    const chatId = msg.chat.id
    const userId = msg.from.id
    console.log(msg)
    if (admins.includes(userId)) {
        const data = JSON.parse(fs.readFileSync("./movies.json", "utf8"));
        const name = match[1];
        const keys = Object.keys(data)
        const values = Object.values(data)
        const code = Number(keys[keys.length - 1]) + 1
        if (!values.includes(name)) {
            addMovie(code.toString(), name);
            await bot.sendMessage(5429133787, `${msg.from.username ? msg.from.username : msg.from.first_name} добавил фильм с названием ${name} под кодом ${code}`)
            return bot.sendMessage(chatId, `Фильм добавлен по коду ${code}`);
        } else {
            return bot.sendMessage(chatId, `Фильм добавлен по коду ${keys[values.indexOf(name)]}`);
        }
    } else {
        return bot.sendMessage(chatId, "Нет доступа")
    }
});

bot.onText(/\/stats/, msg => {
    const userId = msg.from.id
    if (admins.includes(userId)) {
        const data = JSON.parse(fs.readFileSync("./refs.json", "utf8"));
        return bot.sendMessage(msg.chat.id, `👨‍💼- ${data[userId]} чел\n💰 - ${data[userId] * 6}₽`)
    } else {
        return bot.sendMessage(chatId, "Нет доступа")
    }
})