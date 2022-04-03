import { MessageReaction, PartialMessageReaction, User, PartialUser, TextChannel } from 'discord.js';
import { Bot } from './../entities';

module.exports = {
    name: 'messageReactionRemove',
    async execute(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) {
        var channel = reaction.message.channel as TextChannel;

        var session = Bot.Instance().get_session_by_id(channel.id);
        if (session) {
            await session.remove_player(user.id);
        }
    },
};
