import { Interaction } from 'discord.js';
import { commands } from '../commands';
import { Command } from '../commands/command';

const name = 'interactionCreate';

async function execute(handle: Interaction) {
    if (handle.isCommand()) {
        const { commandName } = handle;
        commands.find((c: Command) => c.name === commandName)?.execute(handle);
    }
}

export { name, execute };