import { CommandInteraction, ApplicationCommandData, ApplicationCommand } from 'discord.js';
import { Bot } from '../entities';

export const data: ApplicationCommandData = {
	name: 'create_room',
	description: 'Creates a new storyteller room!',
	options: [{
		type: 3,
		name: 'name_of_room',
		description: 'Name of the room',
		required: false,
	}]
};

export async function execute(interaction: CommandInteraction) {
	if (!interaction.guild)
		throw new Error("guild=null");

	let opt = interaction.options.get('name_of_room');
	let roomName = opt?.value as string || "new_room";

	await Bot.Instance().createRoom(interaction, roomName);
	interaction.reply("Channel created");
}