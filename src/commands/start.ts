import { CommandInteraction, ApplicationCommandData } from 'discord.js'
import { Bot, Room } from '../entities'
import { Command } from './command'

export default class implements Command {
    data: ApplicationCommandData = {
        name: 'start',
        description: 'Starts the game phase'
    };

    async execute(interaction: CommandInteraction) {
        if (!interaction.guild) {
            throw new Error('guild=null');
        }

        const room = Bot.Instance().rooms.find((room: Room) => room.sysChannel?.id === interaction.channelId);
        if (!room) return interaction.reply('Use this command only in a game room');

        room.chatChannel?.send('Game is starting....');
        room.start();
        return interaction.reply('Game started');
    }
}
