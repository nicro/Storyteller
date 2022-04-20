import { CommandInteraction, ApplicationCommandData } from 'discord.js'
import { Bot } from '../entities'
import { Command } from './command'

export default class implements Command {
    name: string = 'create';

    data: ApplicationCommandData = {
        name: 'create',
        description: 'Creates a new storyteller room!',
        options: [
            {
                type: 3,
                name: 'name',
                description: 'Name of the room',
                required: false
            },
            {
                type: 3,
                name: 'number',
                description: 'Number of the players',
                required: false
            },
            {
                type: 3,
                name: 'save',
                description: 'The name of a save to load',
                required: false
            }
        ]
    };

    async execute(handle: CommandInteraction) {
        if (!handle.guild) {
            throw new Error('guild=null');
        }

        const roomName: string = handle.options.get('name')?.value as string || 'NewRoom';
        const playersNumber: number = handle.options.get('number')?.value as number || 3;

        const opt = handle.options.get('save');
        const save = opt ? opt?.value as string : undefined;

        const room = await Bot.Instance().createRoom(handle, roomName, playersNumber, save);
        return handle.reply(`New room <#${room?.sysChannel?.id}> created`);
    }
}
