const sessions = {};

export function getSession(userId) {
    if (!sessions[userId]) {
        sessions[userId] = {
            state: null,
            data: {}
        };
    }

    return sessions[userId];
}