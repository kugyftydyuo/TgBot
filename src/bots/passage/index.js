import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'

const bot = new TelegramBot(process.env.PASSAGE_BOT_TOKEN, {polling: true})

const channels = ['@Parad1se_News']

bot.onText(/\/start(?: (.+))?/, async (msg, match) => {
    const chatId = msg.chat.id
    const ref = match[1]

    await bot.sendMessage(chatId, "Для того чтобы получить название подпишись на 👇<b>следующиe каналы</b>👇 и нажми\n✅Проверить и получить название", {
        reply_markup: {
            inline_keyboard: [
                [{text: '➕ Подписаться', url: "https://t.me/+cqkrYv1GR4dlNGVi"}],
                [{text: '✅Проверить и получить название', callback_data: `check_${ref}`}]
            ],
        },
        parse_mode: 'HTML'
    })
})

bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const userId = query.from.id;
    const ref = query.data.slice(6, query.data.length) === "undefined" ? "marlboro" : query.data.slice(6, query.data.length)

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
            const link = `https://t.me/CoolFilmHubBot?start=${ref}`
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
            await bot.sendMessage(chatId, '❌ Подпишись на все каналы')
        }
    }
})