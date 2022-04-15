import { CommandInteraction, ApplicationCommandData } from 'discord.js';

export const data: ApplicationCommandData = {
	name: 'ping',
	description: 'Replies with Pong!'
};

export async function execute(interaction: CommandInteraction) {
	return interaction.reply("pong");
};