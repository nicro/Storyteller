import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Bot } from '../entities';

export const data = new SlashCommandBuilder()
	.setName('create_room')
	.setDescription('Creates a new storyteller room!')
	.addStringOption((option: any) => option
		.setName('name_of_room')
		.setDescription('some random description')
		.setRequired(false)
	);

export async function execute(interaction: CommandInteraction) {
	if (!interaction.guild)
		throw new Error("guild=null");

	let opt = interaction.options.get('name_of_room');
	let roomName = opt?.value as string || "new_room";

	await Bot.Instance().createRoom(interaction, roomName);
	interaction.reply("Channel created");
}