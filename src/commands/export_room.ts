import { CommandInteraction, ApplicationCommandData, ApplicationCommand } from 'discord.js';
import { Bot, Room } from '../entities';
import fs from 'fs';

export const data: ApplicationCommandData = {
	name: 'export_room',
	description: 'Export a room session!'
};

export async function execute(interaction: CommandInteraction) {

    const filename = `/tmp/export_${interaction.channelId}.json`;

    let session = Bot.Instance().getSession(interaction.channelId)?.session;
    if (!session) interaction.reply('unknown session');

    fs.writeFileSync(filename, session?.toJson() ||'json parsing failed');

    interaction.reply({ files: [filename] });
}