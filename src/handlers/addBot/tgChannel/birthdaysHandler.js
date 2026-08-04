import axios from "axios";
import {tgAdmins} from "../../../config/workers.js";

export async function birthdaysHandler(msg, bot) {
    if (tgAdmins.includes(msg.from.id)) {
        const query = `{
            Page(page: 1, perPage: 1000) {
                characters(isBirthday: true, sort: FAVOURITES_DESC) {
                    favourites
                    name {
                        userPreferred
                    }
                }
            }   
        }`
        const birthdays = await axios.post("https://graphql.anilist.co", {query});
        const anilist = birthdays.data.data.Page.characters.slice(0, 5);

        let message = ``

        anilist.map(char => {
            message += `${char.name.userPreferred}\n\n`
        })

        bot.sendMessage(msg.chat.id, message)
    } else {
        return bot.sendMessage(msg.chat.id, "❌ Нет доступа")
    }
}