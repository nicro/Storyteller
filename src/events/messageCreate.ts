import { Message } from 'discord.js';
import { Bot } from './../entities';

module.exports = {
	name: 'messageCreate',
	async execute(msg: Message) {
        if (msg.channel.type == 'DM' && !msg.author.bot) {

            for (const session of Bot.Instance().sessions) {
                let player = session.findPlayer(msg.author.id);
                if (player) {
                    player.handleMessage(msg.content);
                    session.refreshProgress();
                }
                else msg.reply('you are not in any of the games yes :(');
            }
            //let player = Bot.Instance().findPlayer(msg.author.id);
            //if (player) {
            //    player.handleMessage(msg.content);
            //    Bot.Instance().refreshProgress
            //}
            //else msg.reply("you are not in any of the games yes :(");
        }
	},
};
