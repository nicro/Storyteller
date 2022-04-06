import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Bot, Room } from '../entities';

export const data = new SlashCommandBuilder()
	.setName('start_game')
	.setDescription('Starts the game phase');

export async function execute(interaction: CommandInteraction) {
	if (!interaction.guild)
		throw new Error("guild=null");

    let startFlag: boolean = false;
    await Bot.Instance().rooms.forEach((room: Room) => {
        if (room.sysChannel?.id == interaction.channelId && !startFlag) {
            room.chatChannel?.send("Game is starting....");
            room.session.phase.start();
            interaction.reply("Game started");
            startFlag = true
        }
    })

    if (!startFlag) {
        interaction.reply("Use this command in a game room");
    }
}