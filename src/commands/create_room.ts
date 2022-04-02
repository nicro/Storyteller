import { CommandInteraction, NonThreadGuildBasedChannel, TextChannel } from "discord.js";

const { SlashCommandBuilder } = require('@discordjs/builders');

const { Bot } = require("../entities")

export const data = new SlashCommandBuilder()
	.setName('create_room')
	.setDescription('Creates a new storyteller room!')
	.addStringOption((option: any) => option
		.setName('name_of_room')
		.setDescription('some random description')
		.setRequired(false)
	);
	

export async function execute(interaction: CommandInteraction) {

	if (!interaction.guild)
		throw new Error("guild=null");

	let opt = interaction.options.get('name_of_room');
	let roomName = opt?.value as string || "new_channel";

	interaction.guild.channels.create(roomName, {
		permissionOverwrites: [
			{
				id: interaction.guild.roles.everyone,
			}
		],
	}).then(channel => {
		Bot.Instance().create_room(channel as TextChannel);
		interaction.reply("new game called " + roomName + " created");
	}).catch(console.log);
}