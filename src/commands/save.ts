import { CommandInteraction, ApplicationCommandData } from 'discord.js'
import { Bot } from '../entities'
import { getRandomId } from './../utils/random'
import { Command } from './command'

import fs from 'fs'
import config from './../config'

export default class implements Command {
    data: ApplicationCommandData = {
        name: 'save',
        description: 'Save a room session!'
    };

    async execute(interaction: CommandInteraction) {
        const room = Bot.Instance().getRoom(interaction.channelId);
        if (!room) return interaction.reply('unknown room');

        const filename = `${config.SAVES_DIR}${room.name}_${getRandomId().substring(8)}.json`;

        const data = room?.serialize();
        if (!data) return interaction.reply('session is null');

        if (!fs.existsSync(config.SAVES_DIR)) {
            fs.mkdirSync(config.SAVES_DIR);
        }

        fs.writeFileSync(filename, JSON.stringify(data));
        return interaction.reply('session saved!');
    }
}
