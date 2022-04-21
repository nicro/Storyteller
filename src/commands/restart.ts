import { CommandInteraction, ApplicationCommandData } from 'discord.js'
import { Bot, Room } from '../entities'
import { Command } from './command'

export default class implements Command {
    data: ApplicationCommandData = {
        name: 'restart',
        description: 'Restarts the game phase'
    };

    async execute(interaction: CommandInteraction) {
        if (!interaction.guild) {
            throw new Error('guild=null');
        }

        const room = Bot.Instance().rooms.find((room: Room) => room.sysChannel?.id === interaction.channelId);
        if (!room) return interaction.reply('Use this command only in a game room');

        room.chatChannel?.send('Game is restarting....');
        room.resetPhase();
        room.start();
        return interaction.reply('Game restarted');
    }
}
