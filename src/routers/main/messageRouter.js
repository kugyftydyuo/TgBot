import {getMainBotSession} from "../../state/mainBotSession.js";
import {waitingCode} from "../../features/movie/search/waitingCode.js";

function idle(bot, msg) {
    bot.deleteMessage(msg.chat.id, msg.message_id)
}

const stateRoutes = {
    WAITING_CODE: waitingCode,
    IDLE: idle
}

export async function messageRouter(msg, bot) {
    const userId = msg.from.id
    const text = msg.text
    const session = getMainBotSession(userId)

    if (msg.animation) {
        console.log('Ваш file_id:', msg.animation.file_id);
    }

    if (text.startsWith("/start")) return

    const handler = stateRoutes[session.state];
    if (!handler) {
        return;
    }
    await handler(bot, msg);
}