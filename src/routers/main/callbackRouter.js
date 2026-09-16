import {check} from "../../features/checkSubscription/check.js";
import {search} from "../../features/movie/search/search.js";
import {support} from "../../features/contacts/support.js";
import {backToMain} from "../../features/back/backToMain.js";
import {searchRandom} from "../../features/movie/search/searchRandom.js";
import {searchGenre, searchGenrePage, searchGenreStart} from "../../features/movie/search/searchGenre.js";
import {back} from "../../features/back/back.js";
import {gameGuessNumber, guess} from "../../features/games/guessNumber/gameGuessNumber.js";
import {buyTraffic} from "../../features/contacts/buyTraffic.js";

const exactRoutes = {
    check: check,
    search: search,
    back_to_main: backToMain,
    search_genre: searchGenreStart,
    back: back,
    start_game_guess_number: gameGuessNumber,
}

const prefixRoutes = [
    {prefix: "support", handler: support},
    {prefix: "search_random_", handler: searchRandom},
    {prefix: "search_genre_", handler: searchGenre},
    {prefix: "guess_number_", handler: guess},
    {prefix: "page_", handler: searchGenrePage},
    {prefix: "buy_traffic", handler: buyTraffic}
]

export function callbackRouter(query, bot) {
    const exactHandler = exactRoutes[query.data]
    if (exactHandler) {
        return exactHandler(bot, query);
    }

    const prefixRoute = prefixRoutes.find(route => query.data.startsWith(route.prefix));
    if (prefixRoute) {
        return prefixRoute.handler(bot, query);
    }

    console.log("Какой-то непонятный callback: ", query.data);
}