import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'
import fs from 'fs'
const bot = new TelegramBot(process.env.ADD_BOT_TOKEN, {polling: true})

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
    return bot.sendMessage(msg.chat.id, "Добро пожаловать\nЗдесь вы можете добавить бота по коду\nДля того чтобы добавить бота напишите /add название", {
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                [{text: "/stats"}]
            ]
        }
    })
})

bot.onText(/\/add (.+)/, async (msg, match) => {
    const chatId = msg.chat.id
    const userId = msg.from.id

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

const parallels = {
    8501167201: "TeB6GZ369vUr",
    1942693598: "IsLnck0mCnC2",
}

bot.onText(/\/stats/, msg => {
    const userId = msg.from.id
    if (admins.includes(userId)) {
        const data = JSON.parse(fs.readFileSync("./refs.json", "utf8"));
        return bot.sendMessage(msg.chat.id, `👨‍💼- ${data[parallels[userId]]} чел\n💰 - ${data[parallels[userId]] * 6}₽`)
    } else {
        return bot.sendMessage(chatId, "Нет доступа")
    }
})