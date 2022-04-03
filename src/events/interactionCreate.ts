import { Interaction } from 'discord.js';
import * as commandModules from '../commands'

const commands = Object(commandModules);

module.exports = {
	name: 'interactionCreate',
	async execute(interaction: Interaction) {
        if (interaction.isCommand()) {
            const { commandName } = interaction;
            commands[commandName].execute(interaction, interaction.client);
            return;
        }
	},
};
