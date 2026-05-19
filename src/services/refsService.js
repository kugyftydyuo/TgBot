import fs from "fs";
import {getUser} from "./userService.js";
import {REFS_PATH} from "../config/paths.js";

export function getRefs() {
    return JSON.parse(fs.readFileSync(REFS_PATH, "utf-8"));
}

export function saveRefs(refs) {
    fs.writeFileSync(REFS_PATH, JSON.stringify(refs, null, 2));
}

let refState = {}

export function setRef(ref, userId) {
    refState[userId] = {
        ref: ref
    }
}

export function getRef(userId) {
    const user = getUser(userId)
    if (user.ref !== null) {
        return user.ref
    } else {
        return refState[userId].ref
    }
}