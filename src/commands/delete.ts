import { CommandInteraction, ApplicationCommandData } from 'discord.js';
import { Bot, Room } from '../entities';

export const data: ApplicationCommandData = {
	name: 'delete',
	description: 'Delete a storyteller room!'
};

export async function execute(interaction: CommandInteraction) {
	if (!interaction.guild)
		throw new Error("guild=null");

    let opt = interaction.options.get('name_of_room');
    if (!opt) {
        Bot.Instance().rooms.forEach((room: Room) => {
            if (room.sysChannel?.id == interaction.channelId)
                room.delete();
        });
        return interaction.reply("Channel deleted");
    }
}