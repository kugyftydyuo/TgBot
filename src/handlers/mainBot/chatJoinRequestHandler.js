import {getUser} from "../../services/userService";
import {db} from "../../database/database";

export async function chatJoinRequestHandler(userId) {
    const user = getUser(userId)

    if (user) {

    }
}