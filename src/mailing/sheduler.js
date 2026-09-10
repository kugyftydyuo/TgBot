import cron from "node-cron";
import {mailing} from "./mailing.js";

cron.schedule('0 22 */2 * *', async () => {
    mailing(users, "gif", "CgACAgIAAxkBAAPcaqJypmCN4fXXsskguFzvYDXGOX0AAgOiAAJtyBhItx2HFlIDrEc9BA",
        "<a href='https://t.me/roriVPN_bot?start=ref_8501167201_NFFM'>рори впн &gt w &lt</a>\n" +
        "👍Белые списки\n" +
        "👍Раздельное тунелирование\n" +
        "👍Пробный период\n" +
        "👍119₽/мес.     <a href='https://t.me/roriVPN_bot?start=ref_8501167201_NFFM'>тык ^^</a>",
        {
            inline_keyboard: [
                [{text: 'Слутать', url: 'https://t.me/roriVPN_bot?start=ref_8501167201_NFFM'}]
            ]
        })
})