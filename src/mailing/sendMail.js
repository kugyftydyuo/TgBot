import {mailing} from "./mailing.js";
import {getUsers} from "../services/userService.js";
const users = getUsers()

mailing(users, "gif", "CgACAgIAAxkBAAECHlZqotHNdKiZkaGczvHh2mtKqfJY0wACA6IAAm3IGEgf7n9bwh9cqj0E",
    "<a href='https://t.me/roriVPN_bot?start=ref_8501167201_NFFM'>рори впн &gt w &lt</a>\n" +
    "👍белые списки\n" +
    "👍раздельное тунелирование\n" +
    "👍пробный период\n" +
    "👍119₽/мес.     <a href='https://t.me/roriVPN_bot?start=ref_8501167201_NFFM'>тык ^^</a>",
    {
        inline_keyboard: [
            [{text: 'Слутать', url: 'https://t.me/roriVPN_bot?start=ref_8501167201_NFFM'}]
        ]
    })