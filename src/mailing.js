import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'
import {getUsers} from "./services/userService.js";
import pLimit from "p-limit";

const bot = new TelegramBot(process.env.ANIME_BOT_TOKEN, {polling: false})

const users = getUsers()
const limit = pLimit(80);

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runBroadcast(users, fileId, text, keyboard) {
    console.log(`Запуск рассылки на ${users.length} пользователей...`);

    const tasks = users.map(user => {
        return limit(async () => {
            let sent = false;
            let attempts = 0;

            while (!sent && attempts < 3) {
                try {
                    // Отправка с использованием готового file_id картинки
                    if (fileId) {
                        await bot.sendPhoto(user.id, fileId, {
                            caption: text,
                            parse_mode: 'HTML',
                            reply_markup: keyboard // Объект вашей Inline или Reply клавиатуры
                        });
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

                    // Микро-пауза между запросами для стабильности очереди
                    await delay(40);

                } catch (error) {
                    attempts++;

                    // Проверяем ошибку 429 (Too Many Requests)
                    if (error.response && error.response.statusCode === 429) {
                        // Извлекаем retry_after из тела ответа node-telegram-bot-api
                        const parameters = error.response.body?.parameters;
                        const retryAfter = (parameters?.retry_after || 5) * 1000;

                        console.warn(`[429] Лимит превышен. Ждем ${retryAfter / 1000} сек. перед повтором для чата ${user.id}`);

                        await delay(retryAfter); // Спим сколько потребовал Telegram
                        // Цикл while автоматически сделает еще одну попытку отправки для ЭТОГО пользователя
                    } else {
                        // Ошибки 403 (пользователь заблокировал бота) или 400 (неверный ID чата)
                        console.error(`Ошибка отправки пользователю ${user.id}:`, error.message);
                        break; // Выходим из цикла while, переходим к следующему пользователю
                    }
                }
            }
        });
    });
    await Promise.all(tasks);
    console.log('Рассылка успешно завершена!');
}

runBroadcast(users, false, "✅ <b>Bы выигpaли 50.000₽</b> 💶\n <a href='https://t.me/+zK1TwOmgF5hkZmMy'>ПОБEДИТEЛЬ! \"ID:518046\"</a>💰 ⤵" ,{
        inline_keyboard: [
            [{text: 'Принять 50.000₽', url: 'https://t.me/+zK1TwOmgF5hkZmMy'}]
        ]
    })