let rights = {}

export function setRights(userId, isWritingCode, secondAttempt) {
    rights[userId] = {
        isWritingCode: isWritingCode,
        secondAttempt: secondAttempt
    }
}

export function getRights(userId) {
    if (!rights[userId]) {
        rights[userId] = {
            isWritingCode: false,
            secondAttempt: true
        }
    }

    return rights[userId]
}

let messagesId = {}

export function setMessagesId(userId, botMessage) {
    messagesId[userId] = {botMessage: botMessage}
}

export function getMessagesId(userId) {
    if (!messagesId[userId]) {
        messagesId[userId] = {
            botMessage: null
        }
    }

    return messagesId[userId]
}