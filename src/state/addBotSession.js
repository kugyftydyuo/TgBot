const addBotSession = {};

export function getAddBotSession(userId) {
    if (!addBotSession[userId]) {
        addBotSession[userId] = {
            state: null,
            data: {}
        };
    }

    return addBotSession[userId];
}