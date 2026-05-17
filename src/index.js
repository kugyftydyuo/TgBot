require('dotenv').config()
const TelegramApi = require('node-telegram-bot-api')
const fs = require("fs")
const token = process.env.MAIN_BOT_TOKEN
const bot = new TelegramApi(token, {polling: true})

let rights = {}
let userRefs = {}
let botsMessageId = {};

function getMovies() {
    return JSON.parse(fs.readFileSync("./movies.json", "utf-8"))
}

const channels = [
    '@sponsor1example',
    '@sponsor2example'
]

function handleConversion(userId, ref) {
    const refs = JSON.parse(fs.readFileSync("./refs.json", "utf-8"));
    const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

    if (!refs[ref]) {
        refs[ref] = 1;
    }

    if (!users[userId]) {
        users[userId] = {
            isSubscribed: false,
            ref: ref,
            subscribes: userRefs[userId].subscribes
        };
    }

    if (!users[userId].isSubscribed) {
        users[userId].isSubscribed = userRefs[userId].subscribes.length === 2
        if (users[userId].isSubscribed) {
            refs[ref]++;
        }
    }
    fs.writeFileSync("./refs.json", JSON.stringify(refs, null, 2));
    fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));
}

function checkRef(userId, ref, text) {
    const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

    if (!users[userId]) {
        userRefs[userId] = {
            ref: text === "/start" ? "1942693598" : ref,
            subscribes: []
        }
        users[userId] = {
            isSubscribed: false,
            ref: ref,
            subscribes: userRefs[userId].subscribes
        };
    } else {
        userRefs[userId] = {
            ref: users[userId].ref,
            subscribes: users[userId].subscribes
        }
    }
    fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));
}

bot.onText(/\/start(?: (.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id

    checkRef(userId, match[1], msg.text)

    await bot.sendPhoto(chatId, fs.createReadStream("./images/hello.jpg"), {
        caption: "Добро пожаловать👋\nCпасибо что пользуешься нашим ботом🤜🤛",
    });
    await bot.sendMessage(chatId, "Для того чтобы отправить код подпишись на следующие каналы и нажми проверить", {
        reply_markup: {
            inline_keyboard: [
                [{text: 'sponsor1', url: "https://t.me/+cqkrYv1GR4dlNGVi"}, {text: 'sponsor2', url: "https://t.me/+X689MU1msFY3ZjQy"}],
                [{text: 'Проверить', callback_data: "check"}],
                [{text: 'Сотрудничество', callback_data: 'support'}]
            ],
        }
    })
});

bot.on('message', async msg => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const messageId = msg.message_id
    const userId = msg.from.id
    if (!rights[chatId]) {
        rights[chatId] = {
            isWritingCode: false,
            secondAttempt: false
        };
    }

    try {
        if (text === "/start" || text === "/start 8501167201" || text === "/start 1942693598") {
            return;
        }
        if (rights[chatId].isWritingCode) {
            const movie = getMovies()[text];
            if (movie) {
                rights[chatId].isWritingCode = false
                const botMessage = await bot.sendMessage(chatId, `Название аниме: ${movie}`, {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: 'Найти фильм-аниме🎥', callback_data: 'search' }
                            ]
                        ]
                    }
                })
                botsMessageId[userId] = {botMessage: botMessage.message_id, myMessage: !botsMessageId[userId] ? 0 : botsMessageId[userId].myMessage}
                await bot.deleteMessage(chatId, messageId)
                await bot.deleteMessage(chatId, botsMessageId[userId].myMessage)
            } else {
                const botMessage = await bot.sendMessage(chatId, "❌Код неверный, перепроверь и отправь еще раз")
                botsMessageId[userId] = {botMessage: botMessage.message_id, myMessage: !botsMessageId[userId] ? 0 : botsMessageId[userId].myMessage}
                await bot.deleteMessage(chatId, botsMessageId[userId].myMessage)
            }
        } else {
            botsMessageId[userId] = {botMessage: !botsMessageId[userId] ? 0 : botsMessageId[userId].botMessage, myMessage: messageId}
            if (!rights[userId].secondAttempt) {
                await bot.deleteMessage(chatId, botsMessageId[userId].myMessage)
                rights[userId].secondAttempt = true
                return bot.editMessageText("❌Для того чтобы отправить код нажми на кнопку Найти фильм-аниме🎥", {
                    chat_id: chatId,
                    message_id: botsMessageId[userId].botMessage,
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: 'Найти фильм-аниме🎥', callback_data: 'search' }
                            ]
                        ]
                    }
                });
            }
            await bot.deleteMessage(chatId, botsMessageId[userId].myMessage)
        }

    } catch (e) {
        console.log(e.message)
    }
});

bot.on("callback_query", async (query) => {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

    checkRef(userId, users[userId].ref)

    if (!rights[chatId]) {
        rights[chatId] = {
            isWritingCode: false,
            secondAttempt: false
        };
    }

    if (query.data === "check") {
        let isSubscribed = true;

        for (const channel of channels) {
            const member = await bot.getChatMember(channel, userId);
            if (
                member.status !== "member" &&
                member.status !== "administrator" &&
                member.status !== "creator"
            ) {
                if (userRefs[userId].subscribes.includes(channel)) {
                    userRefs[userId].subscribes = userRefs[userId].subscribes.filter(item => item !== channel)
                }
                isSubscribed = false;
            } else {
                if (!userRefs[userId].subscribes.includes(channel)) {
                    userRefs[userId].subscribes.push(channel)
                }
            }
        }
        const ref = userRefs[userId].ref;
        handleConversion(userId, ref);

        if (isSubscribed) {
            await bot.editMessageText(
                '✅ Доступ разрешён\n\nВыберите действие:',
                {
                    chat_id: chatId,
                    message_id: messageId,
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: 'Найти фильм-аниме🎥', callback_data: 'search' }
                            ]
                        ]
                    }
                }
            );
        } else {
            await bot.editMessageText('❌ Подпишитесь на все каналы', {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Проверить подписку', callback_data: 'back' }
                        ]
                    ]
                }
            });
        }
    }
    if (query.data === 'search') {
        let isSubscribed = true;
        rights[chatId].isWritingCode = true
        rights[chatId].secondAttempt = false
        for (const channel of channels) {
            const member = await bot.getChatMember(channel, userId);
            if (
                member.status !== "member" &&
                member.status !== "administrator" &&
                member.status !== "creator"
            ) {
                if (userRefs[userId].subscribes.includes(channel)) {
                    userRefs[userId].subscribes = userRefs[userId].subscribes.filter(item => item !== channel)
                }
                isSubscribed = false;
            } else {
                if (!userRefs[userId].subscribes.includes(channel)) {
                    userRefs[userId].subscribes.push(channel)
                }
            }
        }
        if (isSubscribed) {
            botsMessageId[userId] = {botMessage: !botsMessageId[userId] ? 0 : botsMessageId[userId].botMessage, myMessage: messageId}
            await bot.editMessageText('✍ Напиши код из описания видео', {
                chat_id: chatId,
                message_id: messageId,
            });
        } else {
            await bot.editMessageText('❌ Подпишитесь на все каналы', {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Проверить подписку', callback_data: 'back' }
                        ]
                    ]
                }
            });
        }
    }
    if (query.data === 'support') {
        await bot.editMessageText(
            'Связаться с нами можно по следующим контактам:\nhttps://t.me/uglyscum_q',
            {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: '↩Назад', callback_data: 'back' }
                        ]
                    ]
                }
            }
        );
    }
    if (query.data === 'back') {
        rights[chatId].isWritingCode = false
        await bot.editMessageText(
            'Для того чтобы отправить код подпишись на следующие каналы и нажми проверить',
            {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: {
                    inline_keyboard: [
                        [{text: 'sponsor1', url: "https://t.me/+cqkrYv1GR4dlNGVi"}, {text: 'sponsor2', url: "https://t.me/+X689MU1msFY3ZjQy"}],
                        [{text: 'Проверить', callback_data: "check"}],
                        [{text: 'Сотрудничество', callback_data: 'support'}]
                    ],
                }
            }
        );
    }
});