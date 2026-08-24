import {bidsChannels, channels} from '../config/channels.js'
import {db} from "../database/database.js";

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

    let bidsSubscribes = []

    for (const channel of bidsChannels) {
        const member = await bot.getChatMember(channel, userId)

        const isMember =
            member.status === 'member' ||
            member.status === 'administrator' ||
            member.status === 'creator'

        if (isMember) {
            bidsSubscribes.push(channel)
        } else {
            const userBids = db.prepare(`
                SELECT * FROM bids WHERE id = ?
            `).get(userId)

            if (userBids) {
                bidsSubscribes.push(channel)
            }
        }
    }

    return {
        isSubscribed: subscribes.length === channels.length && bidsSubscribes.length === bidsChannels.length,
        subscribes
    }
}

export {
    checkSubscription
}