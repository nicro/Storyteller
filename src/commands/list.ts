import { CommandInteraction, ApplicationCommandData, MessageEmbed } from 'discord.js'
import { trimPrefix } from './../utils/random'
import { Command } from './command'

import config from './../config'
import fs from 'fs'

export default class implements Command {
    name: string = 'list';

    data: ApplicationCommandData = {
    	name: 'list',
    	description: 'Lists available sessions!'
    };

    async execute (handle: CommandInteraction) {
    	let num: number = 1;
    	let response: string = '';

    	fs.readdirSync(config.SAVES_DIR).forEach((name: string) => {
    		response += `${num++}: ${trimPrefix(name)}\n`
    	});

    	const embed = new MessageEmbed()
    		.setColor('#0000ff')
    		.setTitle('Following rooms are saved')
    		.setDescription(response);

    	return handle.reply({ embeds: [embed] });
    }
}
