import {getRefs} from "./refsService.js";

export function countLastResetRefs() {
    const refs = getRefs()

    let lastResetMessage = ``
    let lastResetCount = 0
    for (let i = 0; i < refs.length; i++) {
        if (!refs[i]) break;

        lastResetMessage += `${refs[i].name}: 👤${refs[i].last_reset}\n`
        lastResetCount += refs[i].last_reset
    }
    lastResetMessage += `\nОбщее количество: ${lastResetCount}`
    return lastResetMessage
}

export function countAlwaysRefs() {
    const refs = getRefs()

    let alwaysMessage = ``
    let alwaysCount = 0
    for (let i = 0; i < refs.length; i++) {
        if (!refs[i]) break;

        alwaysMessage += `${refs[i].name}: 👤${refs[i].always}\n`
        alwaysCount += refs[i].always
    }
    alwaysMessage += `\nОбщее количество: ${alwaysCount}`
    return alwaysMessage
}