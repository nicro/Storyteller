import { Client, Guild, ApplicationCommandData } from 'discord.js';
import * as commandModules from './../commands/'

type Command = {
	data: ApplicationCommandData
}

const commands: ApplicationCommandData[] = [];

for (const module of Object.values<Command>(commandModules)) {
    commands.push(module.data);
}

module.exports = {
	name: 'ready',
	once: true,
	async execute(client: Client) {

		commands.forEach((cmd: ApplicationCommandData) => {
			client.guilds.cache.forEach((guild: Guild) => guild.commands.create(cmd));
		});

		console.log('bot ready');
	},
};
