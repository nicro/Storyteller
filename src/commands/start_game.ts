import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Bot, GameSession } from '../entities';

export const data = new SlashCommandBuilder()
	.setName('start_game')
	.setDescription('Starts the game phase');

export async function execute(interaction: CommandInteraction) {
	if (!interaction.guild)
		throw new Error("guild=null");

    let startFlag: boolean = false;
    await Bot.Instance().sessions.forEach((gs: GameSession) => {
        if (gs.sysChannel?.id == interaction.channelId && !startFlag) {
            gs.startGame();
            interaction.reply("Game started");
            startFlag = true
        }
    })

    if (!startFlag) {
        interaction.reply("Use this command in a game room");
    }
}