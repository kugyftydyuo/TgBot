import axios from "axios";
import {tgAdmins} from "../../../config/workers.js";

export async function bestOfMonthHandler(msg, bot) {
    if (tgAdmins.includes(msg.from.id)) {
        const bestOfMonth = await axios.get("https://api.simkl.com/anime/best/month?client_id=f5692835c02d71eef2babb2b95198407f6c1d5fdc36831252667ebd0735261d5&app-name=FrameRush&app-version=1.0")
        const simkl = bestOfMonth.data.slice(0, 10);

        let message = ``

        simkl.map(anime => {
            message += `${anime.title}\n\n`
        })
        bot.sendMessage(msg.chat.id, message)
    } else {
        return bot.sendMessage(msg.chat.id, "❌ Нет доступа")
    }
}