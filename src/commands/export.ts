import { CommandInteraction, ApplicationCommandData } from 'discord.js'
import { Bot } from '../entities'
import { Command } from './command'
import fs from 'fs'

export default class implements Command {
    data: ApplicationCommandData = {
        name: 'export',
        description: 'Export a room session!'
    };

    async execute(interaction: CommandInteraction) {
        const room = Bot.Instance().getRoom(interaction.channelId);
        if (!room) return interaction.reply('unknown session');

        const filename = `/tmp/${room.name}.json`;

        fs.writeFileSync(filename, JSON.stringify(room?.serialize()) || 'json parsing failed');
        return interaction.reply({ files: [filename] });
    }
}
