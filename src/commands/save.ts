import { CommandInteraction, ApplicationCommandData } from 'discord.js';
import { Bot } from '../entities';
import { getRandomId } from './../utils/random'

import fs from 'fs';
import config from './../config'

export const data: ApplicationCommandData = {
	name: 'save',
	description: 'Save a room session!'
};

export async function execute(interaction: CommandInteraction) {

	let room = Bot.Instance().getRoom(interaction.channelId);
    if (!room) return interaction.reply('unknown room');

	const filename = `${config.SAVES_DIR}${room.name}_${getRandomId().substring(8)}.json`;

	const data = room?.toJson();
	if (!data) return interaction.reply('session is null');

	if (!fs.existsSync(config.SAVES_DIR))
		fs.mkdirSync(config.SAVES_DIR);

	fs.writeFileSync(filename, data);
	return interaction.reply('session saved!');
}