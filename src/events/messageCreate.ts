import { Message } from 'discord.js'
import { Bot } from './../entities'

const name = 'messageCreate'

async function execute (msg: Message) {
	if (msg.channel.type === 'DM' && !msg.author.bot) {
		for (const room of Bot.Instance().rooms) {
			const player = room.findPlayer(msg.author.id)
			if (player) {
				player.handleMessage(msg.content)
				room.refreshProgress()
			} else msg.reply('you are not in any of the games yes :(')
		}
	}
}

export { name, execute }
