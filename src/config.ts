import dotenv from 'dotenv'

dotenv.config()

const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN } = process.env

const SAVES_DIR = './saves/'

if (!CLIENT_ID || !GUILD_ID || !DISCORD_TOKEN) { throw new Error('missing env variables') }

const config: Record<string, string> = {
	CLIENT_ID,
	GUILD_ID,
	DISCORD_TOKEN,
	SAVES_DIR
}

export default config
