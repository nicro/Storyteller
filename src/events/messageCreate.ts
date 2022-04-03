import { Message } from 'discord.js';
import { Bot } from './../entities';

module.exports = {
	name: 'messageCreate',
	async execute(msg: Message) {
        if (msg.channel.type == 'DM' && !msg.author.bot) {
            let player = Bot.Instance().findPlayer(msg.author.id);
            if (player) player.handleMessage(msg.content);
            else msg.reply("you are not in any of the games yes :(");
        }
	},
};
