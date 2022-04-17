import { CommandInteraction, ApplicationCommandData } from 'discord.js';
import { Bot, Room } from '../entities';
import { Command } from './command'


export class StartCommand implements Command {

    name: string = 'start';

    data: ApplicationCommandData = {
        name: 'start',
        description: 'Starts the game phase'
    };

    async execute(interaction: CommandInteraction) {
        if (!interaction.guild)
            throw new Error("guild=null");

        let startFlag: boolean = false;
        await Bot.Instance().rooms.forEach((room: Room) => {
            if (room.sysChannel?.id == interaction.channelId && !startFlag) {
                room.chatChannel?.send("Game is starting....");
                room.start();
                startFlag = true;
                return interaction.reply("Game started");
            }
        })

        if (!startFlag) {
            return interaction.reply("Use this command in a game room");
        }
    }
}