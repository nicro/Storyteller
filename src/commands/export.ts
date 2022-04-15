import { CommandInteraction, ApplicationCommandData } from 'discord.js';
import { Bot } from '../entities';
import fs from 'fs';

export const data: ApplicationCommandData = {
	name: 'export',
	description: 'Export a room session!'
};

export async function execute(interaction: CommandInteraction) {

    const filename = `/tmp/export_${interaction.channelId}.json`;
    
    let session = Bot.Instance().getRoom(interaction.channelId)?.session;
    if (!session) interaction.reply('unknown session');

    fs.writeFileSync(filename, session?.toJson() ||'json parsing failed');

    interaction.reply({ files: [filename] });
}