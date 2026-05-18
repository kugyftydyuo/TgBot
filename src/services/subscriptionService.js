import {channels} from '../config/channels.js'

async function checkSubscription(bot, userId) {
    let subscribes = []

    for (const channel of channels) {
        const member = await bot.getChatMember(channel, userId)

        const isMember =
            member.status === 'member' ||
            member.status === 'administrator' ||
            member.status === 'creator'

        if (isMember) {
            subscribes.push(channel)
        }
    }

    return {
        isSubscribed: subscribes.length === channels.length,
        subscribes
    }
}

export {
    checkSubscription
}