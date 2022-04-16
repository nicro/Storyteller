import { CommandInteraction, ApplicationCommandData, MessageEmbed } from 'discord.js';
import { trimPrefix } from './../utils/random';

import fs from 'fs';
import config from './../config'

export const data: ApplicationCommandData = {
    name: 'list',
    description: 'Lists available sessions!'
};

export async function execute(interaction: CommandInteraction) {
    let num: number = 1;
    let response: string = '';

    fs.readdirSync(config.SAVES_DIR).forEach((name: string) => {
        response += `${num++}: ${trimPrefix(name)}\n`;
    });

    let embed = new MessageEmbed()
        .setColor('#0000ff')
        .setTitle('Following rooms are saved')
        .setDescription(response);

    return interaction.reply({ embeds: [embed] });
}