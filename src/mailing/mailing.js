import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'
import pLimit from "p-limit";

const bot = new TelegramBot(process.env.ANIME_BOT_TOKEN, {polling: false})

const limit = pLimit(120);

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function mailing(users, param, fileId, text, keyboard) {
    console.log(`Запуск рассылки на ${users.length} пользователей...`);

    const tasks = users.map(user => {
        return limit(async () => {
            let sent = false;
            let attempts = 0;

            while (!sent && attempts < 3) {
                try {
                    if (param === "photo") {
                        await bot.sendPhoto(user.id, fileId, {
                            caption: text,
                            parse_mode: 'HTML',
                            reply_markup: keyboard
                        });
                    } else if (param === "gif") {
                        await bot.sendAnimation(user.id, fileId, {
                            caption: text,
                            parse_mode: 'HTML',
                            reply_markup: keyboard
                        })
                    } else {
                        await bot.sendMessage(user.id, text, {
                            reply_markup: keyboard,
                            parse_mode: 'HTML',
                            disable_web_page_preview: true,
                            link_preview_options: JSON.stringify({
                                is_disabled: true
                            })
                        })
                    }
                    sent = true;

                    await delay(80);

                } catch (error) {
                    attempts++;

                    if (error.response && error.response.statusCode === 429) {
                        const parameters = error.response.body?.parameters;
                        const retryAfter = (parameters?.retry_after || 5) * 1000;

                        console.warn(`[429] Лимит превышен. Ждем ${retryAfter / 1000} сек. перед повтором для чата ${user.id}`);

                        await delay(retryAfter);
                    } else {
                        console.error(`Ошибка отправки пользователю ${user.id}:`, error.message);
                        break;
                    }
                }
            }
        });
    });
    await Promise.all(tasks);
    console.log('Рассылка успешно завершена!');
}

