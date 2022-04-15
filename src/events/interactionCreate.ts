import { Interaction } from 'discord.js';
import * as commandModules from '../commands'

const commands = Object(commandModules);

module.exports = {
	name: 'interactionCreate',
	async execute(interaction: Interaction) {
        if (interaction.isCommand()) {
            const { commandName } = interaction;
            try { 
                commands[commandName].execute(interaction); 
            }
            catch (e) {
                console.log(e)
            }
            return;
        }
	},
};
