import {channels} from '../config/channels.js'
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

    const userBids = db.prepare(`
        SELECT * FROM bids WHERE id = ?
    `).get(userId)

    const check = userBids ? Boolean(userBids.smotrim) : false

    return {
        isSubscribed: subscribes.length === channels.length && check,
        subscribes
    }
}

export {
    checkSubscription
}