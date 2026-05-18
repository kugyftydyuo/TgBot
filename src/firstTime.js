require('dotenv').config()
const TelegramApi = require('node-telegram-bot-api')
const fs = require("fs")
const token = process.env.MAIN_BOT_TOKEN
const bot = new TelegramApi(token, {polling: true})

let rights = {}

bot.setMyCommands([
    {command: "/find", description: "Найти фильм-аниме🎥"},
    {command: "/support", description: "Связаться с нами"}
])

function getMovies() {
    return JSON.parse(fs.readFileSync("./movies.json", "utf-8"))
}

function handleConversion(userId, ref) {
    const refs = JSON.parse(fs.readFileSync("./refs.json", "utf-8"));
    const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

    if (users[userId]) return;

    if (!refs[ref]) {
        refs[ref] = 0
    }

    refs[ref]++;
    users[userId] = true;

    fs.writeFileSync("./refs.json", JSON.stringify(refs, null, 2));
    fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));
}

bot.onText(/\/start(?: (.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id
    const ref = msg.text === "/start" ? "1942693598" : match[1]

    handleConversion(userId, ref)

    await bot.sendPhoto(chatId, fs.createReadStream("./images/hello.jpg"), {
        caption: "Добро пожаловать👋\nCпасибо что пользуешься нашим ботом🤜🤛\nВоспользуйся одной из кнопок",
        reply_markup: {
            keyboard: [
                ["Найти фильм-аниме🎥"],
                ["Сотрудничество"]
            ],
            resize_keyboard: true
        }
    });
});

bot.on('message', async msg => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (!rights[chatId]) {
        rights[chatId] = {
            isWritingCode: false
        };
    }

    try {
        if (text === "/start" || text === "/start 8501167201" || text === "/start 1942693598") {
            return;
        }
        if (text === "Найти фильм-аниме🎥" || text === "/find") {
            rights[chatId].isWritingCode = true
            return bot.sendMessage(chatId, "✍ Напиши код из описания видео");
        }
        if (text === "Сотрудничество" || text === "/support") {
            rights[chatId].isWritingCode = false
            return bot.sendMessage(chatId, "Связаться с нами можно по следующим контактам:\nhttps://t.me/uglyscum_q")
        }
        if (rights[chatId].isWritingCode) {
            const movie = getMovies()[text];
            if (movie) {
                return bot.sendMessage(chatId, movie);
            }
            return bot.sendMessage(chatId, "❌Код неверный, перепроверь и отправь еще раз");
        }
        return bot.sendMessage(chatId, "❌Неизвестная команда, воспользуйся одной из кнопок");
    } catch (e) {
        console.log(e)
        return bot.sendMessage(chatId, "Произошла какая то ошибка");
    }
});