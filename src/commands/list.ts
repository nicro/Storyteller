import { CommandInteraction, ApplicationCommandData, MessageEmbed } from 'discord.js';
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

        let index: number = 0;

        let reverseString = (str: string) => str.split('').reverse().join('');

        name = reverseString(name);
        let del: number = name.indexOf('_');
        if (del != -1) name = name.substring(del);
        name = reverseString(name);

        response += `${num++}: ${name}\n`;
    });


    let embed = new MessageEmbed()
        .setColor('#0000ff')
        .setTitle('Following rooms are saved')
        .setDescription(response);

    interaction.reply({ embeds: [embed] });
}