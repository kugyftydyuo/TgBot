let userOptions = {}

export function getUserOptions(userId) {
    if (!userOptions[userId]) {
        userOptions[userId] = {
            state: "IDLE",
            botMessageId: null
        }
    }
    return userOptions[userId]
}

export function setUserState(userId, state) {
    userOptions[userId].state = state
}

export function setUserBotMessageId(userId, botMessageId) {
    userOptions[userId].botMessageId = botMessageId
}