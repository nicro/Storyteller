import { CommandInteraction, ApplicationCommandData } from 'discord.js';
import { Bot } from '../entities';
import fs from 'fs';
import { gen_random_id } from './../utils/random'
import config from './../config'

export const data: ApplicationCommandData = {
	name: 'save',
	description: 'Save a room session!'
};

export async function execute(interaction: CommandInteraction) {

	let room = Bot.Instance().getRoom(interaction.channelId);
    if (!room) return interaction.reply('unknown room');

	let session = room?.session;
	if (!session) return interaction.reply('unknown session');

	const filename = `${config.SAVES_DIR}${room.name}_${gen_random_id().substring(8)}.json`;

	const data = session?.toJson();
	if (!data) return interaction.reply('session is null');

	if (!fs.existsSync(config.SAVES_DIR))
		fs.mkdirSync(config.SAVES_DIR);

	fs.writeFileSync(filename, data);
	return interaction.reply('session saved!');
}