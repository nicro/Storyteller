import { MessageReaction, PartialMessageReaction, User, PartialUser, TextChannel } from 'discord.js';
import { Bot } from './../entities';

module.exports = {
    name: 'messageReactionRemove',
    async execute(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) {
        var channel = reaction.message.channel as TextChannel;

        var session = Bot.Instance().getSession(channel.id);
        if (session) {
            await session.removePlayer(user.id);
        }
    },
};
