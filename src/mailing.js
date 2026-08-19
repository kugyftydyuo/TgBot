import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'
import {getUsers} from "./services/userService.js";
import {JETTON_IMG_PATH} from "./config/paths.js";

const bot = new TelegramBot(process.env.SERVER_ANIME_BOT_TOKEN, {polling: true})

function main() {
    const users = getUsers()
    users.map(user => {
        bot.sendPhoto(user.id, JETTON_IMG_PATH, {
            caption: "🤩ПОКА ТЫ ЛИСТАЕШЬ ТИК-ТОК, ДРУГИЕ ЗАРАБАТЫВАЮТ‼️\n" +
                "\n" +
                "<a href='https://telegram.me/elementspace826bot?start=ciaWWDMBeGi'>🤑РЕГИСТРИРУЙСЯ</a> И ПОЛУЧИ +425% К ПЕРВОМУ ДЕПОЗИТУ А ТАК ЖЕ 250 ФРИ СПИНОВ\n" +
                "\n" +
                "<a href='https://jtredportal.com/ciaWWDMBeGi?click_id=%7Bclick_id%7D&target_id=/&target_type=registration'>ЗАБИРАЙ ПРЯМО СЕЙЧАС</a>",
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{text: '✅ВЫИГРЫВАЙ✅', url: 'https://telegram.me/elementspace826bot?start=ciaWWDMBeGi'}],
                    [{text: '💰ЗАРАБАТЫВАЙ💰', url: 'https://jtredportal.com/ciaWWDMBeGi?click_id=%7Bclick_id%7D&target_id=/&target_type=registration'}]
                ]
            }
        });
    })
}

main()