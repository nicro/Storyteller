import { MessageReaction, PartialMessageReaction, User, PartialUser, TextChannel } from 'discord.js';
import { Bot } from './../entities';

module.exports = {
	name: 'messageReactionAdd',
	async execute(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) {
        var channel = reaction.message.channel as TextChannel;
        
        var session = Bot.Instance().get_session_by_id(channel.id);
        if (session) {
            if (reaction.message.reactions.cache.size > 1)
                reaction.remove();
            else {
                await session.add_player(user.id);
            }
        }
	},
};
