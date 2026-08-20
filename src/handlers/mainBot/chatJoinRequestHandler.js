import {getUser} from "../../services/userService.js";
import {db} from "../../database/database.js";

export async function chatJoinRequestHandler(userId) {
    const user = getUser(userId)

    if (user) {

    }
}