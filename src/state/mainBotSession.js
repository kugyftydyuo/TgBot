let mainBotSession = {}

export function getMainBotSession(userId) {
    if (!mainBotSession[userId]) {
        mainBotSession[userId] = {
            state: "IDLE",
            botMessageId: null,
            randomNumber: null,
            searchGenre: ""
        };
    }

    return mainBotSession[userId];
}
