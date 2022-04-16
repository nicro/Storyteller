import { MessageReaction, PartialMessageReaction, User, PartialUser, TextChannel } from 'discord.js';
import { Bot } from '../entities';

module.exports = {
    name: 'messageReactionRemove',
    async execute(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) {
        var channel = reaction.message.channel as TextChannel;

        var room = Bot.Instance().getRoom(channel.id);
        if (room) {
            await room.removePlayer(user.id);
        }
    },
};
