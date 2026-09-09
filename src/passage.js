import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'

const bot = new TelegramBot(process.env.PASSAGE_BOT_TOKEN, {polling: true})

const channels = ['@Parad1se_News']

bot.onText(/\/start(?: (.+))?/, async (msg, match) => {
    const chatId = msg.chat.id
    const ref = match[1]

    await bot.sendMessage(chatId, "Для того чтобы отправить код подпишись на следующиe каналы, оставь заявку, либо отправь старт ботам и нажми ✅Проверить", {
        reply_markup: {
            inline_keyboard: [
                [{text: '➕ Нажать старт', url: "https://t.me/yoursmskabot?start=uglyscum0509"}, {text: '➕ Нажать старт', url: "https://t.me/music_ros_bot?start=uglyscimxs2008"}],
                [{text: '➕ Нажать старт', url: "https://t.me/spineraapp_bot?start=src_5AP3AFEF"}, {text: '➕ Подписаться', url: "https://t.me/+cqkrYv1GR4dlNGVi"}],
                [{text: '✅Проверить', callback_data: `check_${ref}`}]
            ],
        }
    })
})

bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const userId = query.from.id;
    const ref = query.data.slice(6, query.data.length) === "undefined" ? "tryhard" : query.data.slice(6, query.data.length)

    if (query.data.startsWith("check")) {
        let subscribes = []

        for (const channel of channels) {
            const member = await bot.getChatMember(channel, userId)

            const isMember =
                member.status === 'member' ||
                member.status === 'administrator' ||
                member.status === 'creator'

            if (isMember) {
                subscribes.push(channel)
            }
        }

        if (subscribes.length === channels.length) {
            const link = `https://t.me/FrameRush_Bot?start=${ref}`
            await bot.sendMessage(chatId, `✅Подписка подтверждена, для того чтобы получить название нажми <a href="${link}">ЗДЕСЬ</a>`, {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{text: '✅Получить название', url: link}]
                    ]
                },
                disable_web_page_preview: true,
                link_preview_options: JSON.stringify({
                    is_disabled: true
                })
            })
        } else {
            await bot.sendMessage(chatId, '❌ Подпишись на все каналы и нажми старт в ботах')
        }
    }
})