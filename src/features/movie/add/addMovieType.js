import {getAddBotSession} from "../../../state/addBotSession.js";
import {types} from "../../../config/parallels.js";

export async function addMovieType(bot, query) {
    const userId = query.from.id;
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    const session = getAddBotSession(userId)

    const type = query.data.replace("type_", "")

    session.state = "ADD_MOVIE_NAME"
    session.data.type = types[type]

    await bot.editMessageText("📩 Добавление новой записи...\n\n✍ Напиши название", {
        chat_id: chatId,
        message_id: messageId
    })
}