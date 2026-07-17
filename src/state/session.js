let userOptions = {}

export function getUserOptions(userId) {
    if (!userOptions[userId]) {
        userOptions[userId] = {
            state: "IDLE",
            botMessageId: null,
            randomNumber: null,
            searchGenre: ""
        }
    }
    return userOptions[userId]
}

export function setUserState(userId, state) {
    if (!userOptions[userId]) {
        userOptions[userId] = {
            state: state,
            botMessageId: null,
            randomNumber: null,
            searchGenre: ""
        }
    } else {
        userOptions[userId].state = state
    }
}

export function setUserBotMessageId(userId, botMessageId) {
    userOptions[userId].botMessageId = botMessageId
}

export function setUserRandomNumber(userId, randomNumber) {
    if (!userOptions[userId]) {
        userOptions[userId] = {
            state: "IDLE",
            botMessageId: null,
            randomNumber: randomNumber,
            searchGenre: ""
        }
    } else {
        userOptions[userId].randomNumber = randomNumber
    }
}

export function setUserSearchGenre(userId, genre) {
    if (!userOptions[userId]) {
        userOptions[userId] = {
            state: "IDLE",
            botMessageId: null,
            randomNumber: null,
            searchGenre: genre
        }
    } else {
        userOptions[userId].searchGenre = genre
    }
}