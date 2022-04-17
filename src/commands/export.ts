import { CommandInteraction, ApplicationCommandData } from 'discord.js';
import { Bot } from '../entities';

import fs from 'fs';

export const data: ApplicationCommandData = {
	name: 'export',
	description: 'Export a room session!'
};

export async function execute(interaction: CommandInteraction) {

    const filename = `/tmp/export_${interaction.channelId}.json`;
    
    let room = Bot.Instance().getRoom(interaction.channelId);
    if (!room) return interaction.reply('unknown session');

    fs.writeFileSync(filename, JSON.stringify(room?.serialize()) ||'json parsing failed');
    return interaction.reply({ files: [filename] });
}