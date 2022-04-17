import { Client, Guild, ApplicationCommandData } from 'discord.js';
import { commands, Command } from './../commands/';

const name = 'ready';

const cmdList: ApplicationCommandData[] = [];
commands.forEach((c: Command) => cmdList.push(c.data));

async function execute(client: Client) {
	cmdList.forEach((cmd: ApplicationCommandData) => {
		client.guilds.cache.forEach((guild: Guild) => guild.commands.create(cmd));
	});

	console.log('bot ready');
}

export { name, execute };