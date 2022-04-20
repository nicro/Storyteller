import { MessageReaction, PartialMessageReaction, User, PartialUser, TextChannel } from 'discord.js'
import { Bot } from '../entities'

const name = 'messageReactionAdd'

async function execute (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) {
    const channel = reaction.message.channel as TextChannel;

    const room = Bot.Instance().getRoom(channel.id);
    if (room) {
        if (reaction.message.reactions.cache.size > 1) {
            reaction.remove();
        } else {
            await room.addPlayer(user.id);
        }
    }
}

export { name, execute }
