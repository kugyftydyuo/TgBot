import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const USERS_PATH = path.join(__dirname, '../storage/users.json')

export const REFS_PATH = path.join(__dirname, '../storage/refs.json')

export const MOVIES_PATH = path.join(__dirname, '../storage/movies.json')

export const STATS_PATH = path.join(__dirname, '../storage/stats.json')

export const HELLO_IMG_PATH = path.join(__dirname, '../../images/hello.jpg')

export const JETTON_IMG_PATH = path.join(__dirname, '../../images/jetton.jpg')