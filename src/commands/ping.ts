import { CommandInteraction } from "discord.js";

const { SlashCommandBuilder } = require('@discordjs/builders');

export const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!');

export async function execute(interaction: CommandInteraction) {
	return interaction.reply("pong");
}