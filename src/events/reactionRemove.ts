import { MessageReaction, PartialMessageReaction, User, PartialUser, TextChannel } from 'discord.js'
import { Bot } from '../entities'

const name = 'messageReactionRemove'

async function execute (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) {
	const channel = reaction.message.channel as TextChannel

	const room = Bot.Instance().getRoom(channel.id)
	if (room) {
		await room.removePlayer(user.id)
	}
}

export { name, execute }
