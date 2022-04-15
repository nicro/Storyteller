import { CommandInteraction, ApplicationCommandData } from 'discord.js';
import { Bot } from '../entities';

export const data: ApplicationCommandData = {
	name: 'create',
	description: 'Creates a new storyteller room!',
	options: [
		{
			type: 3,
			name: 'name',
			description: 'Name of the room',
			required: false,
		},
		{
			type: 3,
			name: 'players_number',
			description: 'Number of the players',
			required: false,
		},
	]
};

export async function execute(handle: CommandInteraction) {
	if (!handle.guild)
		throw new Error("guild=null");

	const roomName: string = handle.options.get('name')?.value as string || 'new_room';
	const playersNumber: number = handle.options.get('players_number')?.value as number || 3;

	let room = await Bot.Instance().createRoom(handle, roomName, playersNumber);
	return handle.reply(`New room <#${room?.sysChannel?.id}> created`);
}