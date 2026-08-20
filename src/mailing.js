import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'
import {getUsers} from "./services/userService.js";
import pLimit from "p-limit";

const bot = new TelegramBot(process.env.ANIME_BOT_TOKEN, {polling: false})

const users = getUsers()
const limit = pLimit(25);

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
                    await bot.sendPhoto(user.id, fileId, {
                        caption: text,
                        parse_mode: 'HTML',
                        reply_markup: keyboard // Объект вашей Inline или Reply клавиатуры
                    });
                    sent = true;

                    // Микро-пауза между запросами для стабильности очереди
                    await delay(55);

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

runBroadcast(users, 'AgACAgIAAxkBAAOoaoaoSiWGPMF11SEXqXfoFpmuuk0AAh0daxv0-zFILm9iEJjQUIUBAAMCAAN5AAM9BA', "🤩ПОКА ТЫ ЛИСТАЕШЬ ТИК-ТОК, ДРУГИЕ ЗАРАБАТЫВАЮТ‼️\n" +
    "\n" +
    "<a href='https://telegram.me/elementspace826bot?start=ciaWWDMBeGi'>🤑РЕГИСТРИРУЙСЯ</a> И ПОЛУЧИ +425% К ПЕРВОМУ ДЕПОЗИТУ А ТАК ЖЕ 250 ФРИ СПИНОВ\n" +
    "\n" +
    "<a href='https://jtredportal.com/ciaWWDMBeGi?click_id=%7Bclick_id%7D&target_id=/&target_type=registration'>ЗАБИРАЙ ПРЯМО СЕЙЧАС</a>",
    {
        inline_keyboard: [
            [{text: '✅ВЫИГРЫВАЙ✅', url: 'https://telegram.me/elementspace826bot?start=ciaWWDMBeGi'}],
            [{text: '💰ЗАРАБАТЫВАЙ💰', url: 'https://jtredportal.com/ciaWWDMBeGi?click_id=%7Bclick_id%7D&target_id=/&target_type=registration'}]
        ]
    })