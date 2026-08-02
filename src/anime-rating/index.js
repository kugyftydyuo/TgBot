import axios from "axios";
import {createCanvas, loadImage} from "canvas";
import fs from "fs"
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const WIDTH = 1080;
const HEIGHT = 3200;

const CARD_WIDTH = 940;
const CARD_HEIGHT = 260;

const CARD_RADIUS = 25;
const BORDER_WIDTH = 4;

const START_X = 70;
const START_Y = 180;

const GAP_X = 30;
const GAP_Y = 40;

const TITLE_OFFSET = 25;
const CARDS_PER_ROW = 1;

async function drawCard(ctx, anime, position, x, y) {
    const image = await loadImage(anime.bannerImage);

    ctx.save();

    roundRect(
        ctx,
        x,
        y,
        CARD_WIDTH,
        CARD_HEIGHT,
        CARD_RADIUS
    );

    ctx.clip();

    ctx.drawImage(
        image,
        x,
        y,
        CARD_WIDTH,
        CARD_HEIGHT
    );

    const gradient = ctx.createLinearGradient(
        0,
        y,
        0,
        y + CARD_HEIGHT
    );

    gradient.addColorStop(
        0,
        "rgba(0,0,0,0.05)"
    );

    gradient.addColorStop(
        0.55,
        "rgba(0,0,0,0.25)"
    );

    gradient.addColorStop(
        1,
        "rgba(0,0,0,0.75)"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
        x,
        y,
        CARD_WIDTH,
        CARD_HEIGHT
    );

    ctx.restore();

    ctx.lineWidth = BORDER_WIDTH;

    ctx.strokeStyle = "white";

    roundRect(
        ctx,
        x,
        y,
        CARD_WIDTH,
        CARD_HEIGHT,
        CARD_RADIUS
    );

    ctx.shadowColor = "rgba(0,0,0,0.35)";

    ctx.shadowBlur = 18;

    ctx.shadowOffsetX = 0;

    ctx.shadowOffsetY = 8;

    ctx.lineWidth = BORDER_WIDTH;

    ctx.strokeStyle = "white";

    roundRect(
        ctx,
        x,
        y,
        CARD_WIDTH,
        CARD_HEIGHT,
        CARD_RADIUS
    );

    ctx.stroke();

    ctx.shadowColor = "transparent";

    ctx.shadowBlur = 0;

    ctx.shadowOffsetX = 0;

    ctx.shadowOffsetY = 0;

    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";

    ctx.fillRect(
        x,
        y + CARD_HEIGHT - 40,
        CARD_WIDTH,
        40
    );

    ctx.fillStyle = "rgba(0,0,0,0.6)";

    ctx.fillRect(
        x,
        y,
        65,
        50
    );

    ctx.fillStyle = "#ffcc00";

    ctx.font = "bold 40px Arial";

    ctx.fillText(
        `#${position}`,
        x + 10,
        y + 45
    );

    ctx.fillStyle = "#FFFFFF";

    ctx.font = "bold 120px Arial";

    ctx.textAlign = "right";

    ctx.fillText(
        (anime.averageScore / 10).toFixed(1),
        x + CARD_WIDTH - 30,
        y + CARD_HEIGHT - 35
    );

    ctx.textAlign = "left";

    ctx.fillStyle = "white";

    ctx.font = "bold 20px Arial";

    ctx.fillText(
        anime.title.romaji,
        x + 10,
        y + CARD_HEIGHT - 55
    );

}

async function test() {
    const query = `{
        Page(page: 1, perPage: 100) {
            media(
                type: ANIME
                season: SUMMER
                seasonYear: 2026
                sort: POPULARITY_DESC
            ) {
                title {
                    romaji
                }

                averageScore
                popularity
                bannerImage
            }
        }
    }`;

    const response = await axios.post("https://graphql.anilist.co", {query});
    const animeList = response.data.data.Page.media;

    console.log(animeList[1].coverImage.extraLarge)

    animeList.sort((a, b) => {
        return (b.averageScore ?? 0) - (a.averageScore ?? 0);
    });
    const top10 = animeList.slice(0, 10);

    const canvas = createCanvas(WIDTH, HEIGHT);

    const ctx = canvas.getContext("2d");

    let x = START_X;
    let y = START_Y;

    for (let i = 0; i < top10.length; i++) {

        await drawCard(ctx, top10[i], i + 1, x, y);

        if ((i + 1) % CARDS_PER_ROW === 0) {

            x = START_X;
            y += CARD_HEIGHT + GAP_Y;

        } else {

            x += CARD_WIDTH + GAP_X;

        }

    }

    fs.writeFileSync("./src/anime-rating/output/top10.png", canvas.toBuffer("image/png"));
}

async function one() {
    const canvas = createCanvas(1230, 1500);
    const ctx = canvas.getContext("2d");

    let top10 = []

    const bestOfMonth = await axios.get("https://api.simkl.com/anime/best/month?client_id=f5692835c02d71eef2babb2b95198407f6c1d5fdc36831252667ebd0735261d5&app-name=FrameRush&app-version=1.0")
    const simkl = bestOfMonth.data.slice(0, 10);
    const SIMKL_IMG_BASE = 'https://wsrv.nl/?url=https://simkl.in';

    function imageUrl(path, kind = 'posters', size = '_w', ext = '.webp') {
        if (!path) {
            if (kind !== 'posters') return null;
            const ph = size === '_s' ? '_s' : '_c';
            return `${SIMKL_IMG_BASE}/poster_no_pic${ph}.png`;
        }
        return `${SIMKL_IMG_BASE}/${kind}/${path}${size}${ext}&q=90`;
    }

    for (let i = 0; i < simkl.length; i++) {
        setTimeout(() => console.log(i, "110"), 110)
        const anime = await axios.get(`https://api.simkl.com/anime/${simkl[i].ids.simkl_id}?client_id=f5692835c02d71eef2babb2b95198407f6c1d5fdc36831252667ebd0735261d5&app-name=FrameRush&app-version=1.0`)
        const idOnAnilist = anime.data.ids.anilist

        const query = `{
            Media (id: ${idOnAnilist}, type: ANIME) {
                title {
                    romaji
                    english
                }
                coverImage {
                    extraLarge
                }
                bannerImage
            }
    }`
        const responseAnilist = await axios.post("https://graphql.anilist.co", {query});
        const anilist = responseAnilist.data.data.Media;

        top10 = [...top10, {title: !anilist.title.english ? anilist.title.romaji : anilist.title.english, poster: imageUrl(anime.data.poster, 'posters', '_m'), banner: anilist.bannerImage}]
    }

    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, 1230, 1500)

    const background = await loadImage(top10[0].poster)
    ctx.drawImage(background, 82.5, 0, 1065, 1500)

    const bottomGradient = ctx.createLinearGradient(0, 0, 0, 1500);
    bottomGradient.addColorStop(0, "rgba(0,0,0,0)");
    bottomGradient.addColorStop(0.6, "rgba(0,0,0,0.05)");
    bottomGradient.addColorStop(0.7, "rgba(0,0,0,0.9)");
    bottomGradient.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = bottomGradient
    ctx.fillRect(80, 0, 1070, 1500)

    const topGradient = ctx.createLinearGradient(0, 1500, 0, 0);
    topGradient.addColorStop(0, "rgba(0,0,0,0)");
    topGradient.addColorStop(0.7, "rgba(0,0,0,0.05)");
    topGradient.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = topGradient
    ctx.fillRect(80, 0, 1070, 1500)

    const leftGradient = ctx.createLinearGradient(80, 0, 1150, 0);
    leftGradient.addColorStop(0, "rgba(0,0,0,0)");
    leftGradient.addColorStop(0.8, "rgba(0,0,0,0.05)");
    leftGradient.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = leftGradient
    ctx.fillRect(80, 0, 1070, 1500)

    const rightGradient = ctx.createLinearGradient(1150, 0, 80, 0);
    rightGradient.addColorStop(0, "rgba(0,0,0,0)");
    rightGradient.addColorStop(0.8, "rgba(0,0,0,0.05)");
    rightGradient.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = rightGradient
    ctx.fillRect(80, 0, 1070, 1500)

    ctx.fillStyle = "#FFFFFF"
    ctx.font = 'bold 50px Jost';
    ctx.textAlign = "center"
    ctx.fillText("Т о п   10   а н и м е   н е д е л и", 615, 70)

    ctx.beginPath()
    ctx.roundRect(30, 110, 450, 90, 20)
    ctx.fillStyle = "#f6cf02"
    ctx.fill()
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#ae9505';
    ctx.stroke();

    ctx.textAlign = "left"
    ctx.fillStyle = "#000000"
    ctx.font = "bold 40px Jost";
    ctx.fillText("По   версии", 80, 167)

    const pathToImdbLogo = path.join(__dirname, './assets/images/imdb.jpg')
    const imdb = await loadImage(pathToImdbLogo)
    ctx.drawImage(imdb, 340, 138, 80, 38)

    ctx.textAlign = "start"
    ctx.fillStyle = "#FFFFFF"
    ctx.fillText("30 сентября - 30 декабря", 630, 167)

    ctx.fillStyle = "#e9d305"
    ctx.font = "bold 100px Jost"
    ctx.fillText("#1", 120, 350)

    const pathToName = path.join(__dirname, './assets/images/name.png')
    const Mushoku = await loadImage(pathToName)
    ctx.drawImage(Mushoku, 280, 280)

    const pathToLogo = path.join(__dirname, './assets/images/logo.png')
    const logo = await loadImage(pathToLogo);
    ctx.drawImage(logo, 920, 1400, 60, 60)

    ctx.fillStyle = "#FFFFFF"
    ctx.font = "bold 30px Jost";
    ctx.fillText("FrameRush", 1000, 1439)

    ctx.fillText("t.me/FrameRushNews", 30, 1439)

    ctx.font = "bold 200px Jost"
    ctx.fillText((animeList[0].averageScore / 10).toFixed(1), 400, 1400)

    ctx.font = "bold 60px Jost"
    ctx.fillText("/  10", 730, 1400)

    ctx.beginPath()
    ctx.roundRect(400, 1100, 330, 70, 20)
    ctx.fillStyle = "#ffffff"
    ctx.fill()
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#bababa';
    ctx.stroke();

    ctx.fillStyle = "#000000"
    ctx.font = "bold 40px Jost"
    ctx.fillText("Эпизод 1", 470, 1150)

    fs.writeFileSync("./src/anime-rating/output/top10.png", canvas.toBuffer("image/png"));
}
one()